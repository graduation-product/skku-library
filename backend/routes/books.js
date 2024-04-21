const express = require('express');
const mysql      = require('mysql');
const dbconfig   = require('../public/javascripts/database.js');
const cors = require("cors");
const conn = mysql.createConnection(dbconfig);
const router = express.Router();

const client_id = "zM4GOZVdxFujDTQSKGSO";
const client_secret = "yU4uS9vEIM";

router.use(cors());
router.use(express.json());

router.get('/', function(req, res, next) {
  res.send('books root');
});

/////////////////
// ranking API //
/////////////////
// REQUEST:
//   body:{
//      tag:       -tag-(string),
//   }
// 
// RESULT
// [ BOOK_TB 에 있는 데이터 리스트 ]
//      - 데이터는 대출 수 기준으로 내림차순 정렬
//
// NOTE
// tag에 "none" 을 입력하면 전체 출력
router.post('/ranking', (req, res) => {
    console.log(req.body);
    const tag = req.body.tag;

    var sql;
    var params = [tag];

    if(tag === "none"){
        sql = "SELECT * FROM BOOK_TB ORDER BY BOOK_BORROWED DESC";
    }
    else{
        sql = "SELECT * FROM BOOK_TB WHERE BOOK_TAG=? ORDER BY BOOK_BORROWED DESC";
    }

    // console.log("loading..\n");
    conn.query(sql, params, (error, rows) => {
        if(error)
        throw error;
        
        res.status(200).send(rows);
    });
});


////////////////
// search API //
////////////////
// REQUEST:
//   body:{
//      query:       -query-(string),
//   }
// 
// RESULT
// {result: -query를 네이버에 검색한 결과 리스트-}
//
// NOTE
//      - 기본 10개 보여줌
//      - 리스트의 원소, 즉 하나의 책에 대해서
//          * 제목(title)
//          * 이미지(image)
//          * 저자(author)
//          * 출판사(publisher)
//          * ISBN(isbn)
//        정보를 가지고 있음

router.get('/search', (req, res) => {
    var api_url = 'https://openapi.naver.com/v1/search/book.json?display=10&query=' + encodeURI(req.body.query); // json 결과
    var request = require('request');
    var options = {
        url: api_url,
        headers: {
            'X-Naver-Client-Id': client_id, 
            'X-Naver-Client-Secret': client_secret
        }
    };
    request.get(options, (error, response, body) => {
        // console.log(JSON.parse(body).items);
        if (!error && response.statusCode == 200) {
            var ret = new Array();

            for(item of JSON.parse(body).items){
                var tmp = new Object();

                tmp.title     = item.title;
                tmp.image     = item.image;
                tmp.author    = item.author;
                tmp.publisher = item.publisher;
                tmp.isbn      = item.isbn;

                ret.push(tmp);
            }
            res.status(200).json({result: ret});
            // res.status(200).send(body.items);
        }
        else {
            res.status(response.statusCode).end();
            console.log('error = ' + response.statusCode);
        }
    });
});


/////////////////////
// book detail API //
/////////////////////
// REQUEST:
//   body:{
//      book_id:       -book id-(int),
//   }
// 
// RESULT
// {book_id에 해당하는 책 정보}
// 

router.post('/detail', (req, res) => {
    console.log(req.body);
    const book_id = req.body.book_id;

    var sql;
    var params = [book_id];

    sql = "SELECT * FROM BOOK_TB WHERE BOOK_ID=?";

    // console.log("loading..\n");
    conn.query(sql, params, (error, rows) => {
        if(error)
        throw error;
        
        res.status(200).json(rows[0]);
    });
});

////////////////////////
// recommendation API //
////////////////////////
// REQUEST:
//   body:{
//      user_id:   -user_id-(int),
//   }
// 
// RESULT
// [{추천 책 정보1}, {추천 책 정보2}, {추천 책 정보3}, ...]
// 
// NOTE
//      - tag에는 book classifier 정보를 통한 태그
//      - 태그 무시하고 모든 책에 대한 추천을 원할 경우 "전체" 기입
//      - 태그가 여러 개라면 | 를 사용해서 붙이기
//      - 예시)  "컴퓨터|공학|인문 철학"
router.post('/recommend', (req, res) => {

    const user_id = req.body.user_id;

    var sql = "SELECT BOOK_ID FROM USER_BOOKLIST_TB WHERE USER_ID = ?";
    var params = [user_id];

    // 본인이 읽은 책 리스트
    conn.query(sql, params, (error, rows) => {
        if(error)
            throw error;
        
        var arr = [];

        for(var i = 0; i < rows.length; ++i){
            arr.push(rows[i].BOOK_ID);    
        }
        console.log(arr);
        // 본인이 읽은 책을 읽은 다른 유저
        var in_sql = "SELECT USER_ID FROM USER_BOOKLIST_TB WHERE BOOK_ID = ? and USER_ID <> " + user_id + "; ";
        var sqls = "";
        arr.forEach((item) =>{
            sqls += mysql.format(in_sql, item);
        });
        conn.query(sqls, (error, rows) => {
            user_set = new Set();
            user_list = [];
            for(var i = 0; i < rows.length; ++i){
                for(var u = 0; u < rows[i].length; ++u){
                    user_set.add(rows[i][u].USER_ID);
                }
            }
            var in_sql2 = "SELECT BOOK_ID FROM USER_BOOKLIST_TB WHERE USER_ID = ?; ";
            var sqls2 = "";

            for(const item of user_set){
                user_list.push(item);
            }
            user_list.forEach((item) => {
                sqls2 += mysql.format(in_sql2, item);
            });
            conn.query(sqls2, (error, rows) => {
                var book_dict = {};
                var book_list = [];

                for(var i = 0; i < rows.length; ++i){
                    for(var u = 0; u < rows[i].length; ++u){
                        if(rows[i][u].BOOK_ID in book_dict){
                            book_dict[rows[i][u].BOOK_ID] += 1;
                        }
                        else{
                            book_dict[rows[i][u].BOOK_ID] = 1;
                        }
                    }
                }
                for(var i in book_dict){
                    book_list.push([book_dict[i], i]);
                }
                book_list.sort();

                var in_sql3 = "SELECT * FROM BOOK_TB WHERE BOOK_ID = ?;";
                var sqls3 = "";
                var book_params = [];

                for(var i = book_list.length - 1; i >= 0; --i){
                    book_params.push(parseInt(book_list[i][1]));
                }

                book_params.forEach((item) =>{
                    sqls3 += mysql.format(in_sql3, item);
                });

                conn.query(sqls3, (errors, rows) => {
                    console.log(rows);
                    
                    var ret = [];
                    var tag_box = ["인문 철학", "사회 문화", "소설", "수학", "공학", "경영 경제", "컴퓨터"];

                    for(var i = 0; i < tag_box.length; ++i){
                        for(var u = 0; u < rows.length; ++u){
                            if(rows[u][0].BOOK_TAG === tag_box[i]){
                                ret.push(rows[u][0]);
                                break;
                            }
                        }
                    }
                    res.status(200).json(ret);
                    
                });
            });
        });
    });
});


module.exports = router;
