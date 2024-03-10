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

///////////////
// login API //
///////////////
// REQUEST DATA:
//   body:{
//      email:       -email-(string),
//      password:    -pswd-(string),
//   }
// 
// RESULT DATA
// success: login success
//    return => {result: "success"(string), idx: (int)}
// fail_NA: that id doesnt exist
//    return => {result: "fail_NA"(string)}
// fail_WP: password is wrong
//    return => {result: "fail_WP"(string)}
router.post('/login', (req, res) => {
  console.log(req.body);
  const email = req.body.email;
  const pswd = req.body.password;

  var sql = "select count(*) as cnt from users where email = ?";
  var params = [email];

  conn.query(sql, params, (error, rows) => {
      if(error)
        throw error;
      
      if(rows[0].cnt == 1){
        var in_sql = "select * from users where email = ?";
        var in_params = [email];
        conn.query(in_sql, in_params, (error, rows) => {
          if(error)
            throw error;
          
          var cur_idx = rows[0].idx;
          var cur_pswd = rows[0].pswd;

          if(cur_pswd === pswd){
            // success
            res.status(200).json({result:"success", idx:cur_idx});
          }
          else{
            // fail
            res.status(200).json({result:"fail_WP"});
          }
        });
      }
      else{
        // fail
        res.status(200).json({result:"fail_NA"});
      }
    }
  );
});



module.exports = router;
