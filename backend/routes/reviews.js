const express = require('express');
const mysql      = require('mysql');
const dbconfig   = require('../public/javascripts/database.js');
const cors = require("cors");
const conn = mysql.createConnection(dbconfig);
const router = express.Router();

router.use(cors());
router.use(express.json());

router.get('/', function(req, res, next) {
  res.send('reviews root');
});

/////////////////////////
// review register API //
/////////////////////////
// REQUEST:
//   body:{
//      author:     -review author-(int),
//      title:      -review title-(string),
//      content:    -review content-(string),
//   }
// 
// RESULT
// {result: "success"(string)}

router.post('/register', (req, res) => {
    console.log(req.body);
    const auth = req.body.author;
    const title = req.body.title;
    const content = req.body.content;

    var sql = "SELECT MAX(REVIEW_ID) AS MRI FROM REVIEW_TB";

    conn.query(sql, (error, rows) => {
        if(error)
            throw error;
        
        var cur_max = rows[0].MRI
        var in_sql = "INSERT INTO REVIEW_TB VALUES(?, ?, ?, ?, NOW(), ?)";
        var in_params = [cur_max + 1, auth, title, content, 0];

        conn.query(in_sql, in_params, (error, rows) => {
            if(error)
                throw error;
            
            res.status(200).send({"result" : "success"});
        });
    });
});


/////////////////////
// review list API //
/////////////////////
// REQUEST:
//   body:{
//     
//   }
// 
// RESULT
// [{리뷰 1}, {리뷰 2}, ...]
//
// NOTE
//      - 리뷰 전체 리스트를 보여줌
//      - 리스트의 원소, 즉 하나의 리뷰에 대해서
//          * 리뷰 인덱스(REVIEW_ID)
//          * 저자 번호(REVIEW_AUTHOR)
//          * 저자 이름(REVIEW_AUTHOR_NAME)
//          * 제목(REVIEW_TITLE)
//          * 내용(REVIEW_CONTENT)
//          * 날짜(REVIEW_DATE)
//          * 좋아요 수(REVIEW_LIKE)
//        정보를 가지고 있음

router.post('/list', (req, res) => {

    var sql = "SELECT * FROM REVIEW_TB";

    conn.query(sql, (error, rows) => {
        if(error)
            throw error;
        
        res.status(200).json(rows);
    });
});


/////////////////////
// book detail API //
/////////////////////
// REQUEST:
//   body:{
//      review_id:       -review id-(int),
//   }
// 
// RESULT
// {review_id에 해당하는 리뷰 정보}
// 
router.post('/detail', (req, res) => {
    console.log(req.body);
    const review_id = req.body.review_id;

    var sql;
    var params = [review_id];

    sql = "SELECT * FROM REVIEW_TB WHERE REVIEW_ID=?";

    // console.log("loading..\n");
    conn.query(sql, params, (error, rows) => {
        if(error)
        throw error;
        
        res.status(200).json(rows[0]);
    });
});


module.exports = router;
