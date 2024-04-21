const express = require("express");
const mysql = require("mysql");
const dbconfig = require("../public/javascripts/database.js");
const cors = require("cors");
const conn = mysql.createConnection(dbconfig);
const router = express.Router();

router.use(cors());
router.use(express.json());

router.get("/", function (req, res, next) {
  res.send("reviews root");
});

/////////////////////////
// review register API //
/////////////////////////
// REQUEST:
//   body:{
//      author:     -review author-(int),
//      title:      -review title-(string),
//      book_title: -review book title-(string),
//      content:    -review content-(string),
//   }
//
// RESULT
// {result: "success"(string)}

router.post("/register", (req, res) => {
  console.log(req.body);
  const auth = req.body.author;
  const title = req.body.title;
  const book_title = req.body.book_title;
  const content = req.body.content;

  var sql = "SELECT USER_NAME FROM USER_TB WHERE USER_ID = ?";
  var params = [auth];

  conn.query(sql, params, (error, rows) => {
    var in_sql = "SELECT MAX(REVIEW_ID) AS MRI FROM REVIEW_TB";
    var auth_name = rows[0].USER_NAME;

    conn.query(in_sql, (error, rows) => {
      if (error) throw error;

      var cur_max = rows[0].MRI;
      var in_sql2 =
        "INSERT INTO REVIEW_TB VALUES(?, ?, ?, ?, ?, ?, NOW(), ?, ?)";
      var in_params2 = [
        cur_max + 1,
        auth,
        auth_name,
        title,
        book_title,
        content,
        0,
        0,
      ];

      conn.query(in_sql2, in_params2, (error, rows) => {
        if (error) throw error;

        res.status(200).send({ result: "success" });
      });
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
//          * 책 제목(REVIEW_BOOK_TITLE)
//          * 내용(REVIEW_CONTENT)
//          * 날짜(REVIEW_DATE)
//          * 좋아요 수(REVIEW_LIKE)
//          * 조회 수(REVIEW_VIEW)
//        정보를 가지고 있음

router.post("/list", (req, res) => {
  var sql = "SELECT * FROM REVIEW_TB";

  conn.query(sql, (error, rows) => {
    if (error) throw error;

    res.status(200).json(rows);
  });
});

/////////////////////
// review detail API //
/////////////////////
// REQUEST:
//   body:{
//      review_id:       -review id-(int),
//   }
//
// RESULT
// {review_id에 해당하는 리뷰 정보}
//
router.post("/detail", (req, res) => {
  console.log(req.body);
  const review_id = req.body.review_id;

  var sql;
  var params = [review_id];

  sql = "SELECT * FROM REVIEW_TB WHERE REVIEW_ID=?";

  // console.log("loading..\n");
  conn.query(sql, params, (error, rows) => {
    if (error) throw error;

    res.status(200).json(rows[0]);
  });
});

/////////////////////
// like update API //
/////////////////////
// REQUEST:
//   body:{
//      user_id:         -user id-(int),
//      review_id:       -review id-(int)
//   }
//
// RESULT
//   {"result" : "success"}
// 
router.post('/like', (req, res) => {
    const user_id = req.body.user_id;
    const review_id = req.body.review_id;

    var sql = "SELECT COUNT(*) AS CNT FROM LIKE_TB WHERE USER_ID = ? and REVIEW_ID = ?";
    var params = [user_id, review_id];

  conn.query(sql, params, (error, rows) => {
    if (error) throw error;

    conn.query(sql, params, (error, rows) => {
        if(error)
            throw error;
        
        if(rows[0].CNT === 0){
            var in_sql = "UPDATE REVIEW_TB SET REVIEW_LIKE = REVIEW_LIKE + 1 WHERE REVIEW_ID = ?; INSERT INTO LIKE_TB VALUES(?, ?);";
            var in_params = [review_id, user_id, review_id];

            conn.query(in_sql, in_params, (error, rows) => {
                if(error)
                    throw error;

                res.status(200).json({"result" : "success"});
            });
        }
        else{
            res.status(200).json({"result" : "fail: duplicated"});
        }
    });
});

/////////////////////
// view update API //
/////////////////////
// REQUEST:
//   body:{
//      review_id:       -review id-(int),
//   }
//
// RESULT
//   {"result" : "success"}
//
router.post("/view", (req, res) => {
  const review_id = req.body.review_id;

    var sql = "UPDATE REVIEW_TB SET REVIEW_VIEW = REVIEW_VIEW + 1 WHERE REVIEW_ID = ?";
    var params = [review_id];

  conn.query(sql, params, (error, rows) => {
    if (error) throw error;

    res.status(200).json({ result: "success" });
  });
});

module.exports = router;
