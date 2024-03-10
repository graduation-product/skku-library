const express = require('express');
const mysql = require('mysql');
const dbconfig = require('../public/javascripts/database.js');
const cors = require("cors");
const conn = mysql.createConnection(dbconfig);
const router = express.Router();

router.use(cors());
router.use(express.json());

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

///////////////
// login API //
///////////////
// REQUEST:
//   body:{
//      user_number:  -user number-(string),
//      password:     -password-(string),
//   }
// 
// RESULT:
// 성공 시 => {result: "success"(string), user_id: -user id-(int)}
// 실패: 학번 오류(wrong number) => {result: "fail_WN"(string)}
// 실패: 비번 오류(wrong password) => {result: "fail_WP"(string)}

router.post('/login', (req, res) => {
    console.log(req.body);

    const user_number = req.body.user_number;
    const pswd = req.body.password;

    var sql = "SELECT COUNT(*) AS CNT FROM USER_TB WHERE USER_NUMBER=?";
    var params = [user_number];

    conn.query(sql, params, (error, rows) => {
        if (error)
            throw error;

        if (rows[0].cnt == 1) {
            var in_sql = "SELECT USER_ID, USER_PASSWORD FROM USER_TB WHERE USER_NUMBER=?";
            var in_params = [user_number];
            conn.query(in_sql, in_params, (error, rows) => {
                if (error)
                    throw error;

                var cur_id = rows[0].user_id;
                var cur_pswd = rows[0].user_password;

                if (cur_pswd === pswd) {
                    // success
                    res.status(200).json({ result: "success", user_id: cur_id });
                }
                else {
                    // fail
                    res.status(200).json({ result: "fail_WP" });
                }
            });
        }
        else {
            // fail
            res.status(200).json({ result: "fail_WN" });
        }
    });
});



module.exports = router;
