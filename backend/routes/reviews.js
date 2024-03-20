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

/* GET users listing. */
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


module.exports = router;
