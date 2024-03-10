const express = require('express');
const mysql      = require('mysql');
const dbconfig   = require('../public/javascripts/database.js');
const cors = require("cors");
const conn = mysql.createConnection(dbconfig);
const router = express.Router();

router.use(cors());
router.use(express.json());

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/////////////////
// ranking API //
/////////////////
// REQUEST DATA:
//   body:{
//      tag:       -tag-(string),
//   }
// 
// RESULT DATA
// success: login success
//    return => {result: "success"(string), idx: (int)}
// fail_NA: that id doesnt exist
//    return => {result: "fail_NA"(string)}
// fail_WP: password is wrong
//    return => {result: "fail_WP"(string)}
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


module.exports = router;
