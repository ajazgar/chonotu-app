var express = require('express');
var router = express.Router();

var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'joannaDB'
});
connection.connect();
connection.query('USE chonotu');



/* GET home page. */

//http://localhost:3000/?login=Admin
router.get('/', function(req, res, next) {
  var post  = {login: req.query.login};
  var query = connection.query('select * from user where ?', post, function (error, results, fields) {
    if (error) throw error;
    res.render('index', { title: results[0].email });   
  });
  console.log(query.sql);
});

router.get('/about', function(req, res, next) {
  res.render('about', { title: 'Express' });
});

router.get('/account', function(req, res, next) {
  res.render('account', { title: 'Express' });
});

router.get('/buyticket', function(req, res, next) {
  res.render('buyticket', { title: 'Express' });
});

router.get('/event', function(req, res, next) {
  res.render('event', { title: 'Express' });
});

router.get('/kontakt', function(req, res, next) {
  res.render('kontakt', { title: 'Express' });
});

router.get('/listofusers', function(req, res, next) {
  res.render('listofusers', { title: 'Express' });
});

router.get('/zaloguj', function(req, res, next) {
  res.render('zaloguj', { title: 'Express' });
});

router.get('/zarejestruj', function(req, res, next) {
  res.render('zarejestruj', { title: 'Express' });
});
module.exports = router;
