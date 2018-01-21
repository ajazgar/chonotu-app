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
  // var post  = {login: req.query.login};
  // var query = connection.query('select * from user where ?', post, function (error, results, fields) {
  //   if (error) throw error;
  //   res.render('index', { title: results[0].email });   
  // });
  // console.log(query.sql);

  res.render('index');   
});

//http://localhost:3000/checkIfUsernameExists?login=Admin&password=password
router.get('/checkIfUsernameExists', function(req, res, next) {
  var post = [req.query.login, req.query.password ];
  var query = connection.query('select count(*) as c from user where login=? and password=?', post, function (error, results, fields) {
    if (error) throw error;
    if(results[0].c == 0){
        res.redirect('/zaloguj');  
    }
    if(results[0].c == 1){
        res.redirect('account?login='+req.query.login);  
    }
     
  });
});

//http://localhost:3000/zaloguj
router.get('/zaloguj', function(req, res, next) {
    res.render('zaloguj'); 
});

//http://localhost:3000/zarejestruj
router.get('/zarejestruj', function(req, res, next) {
  res.render('zarejestruj');
});

router.get('/addUser', function(req, res, next) {
  var post = [req.query.login, req.query.password, req.query.email, req.query.date_of_birth ];
  var query = connection.query('insert into user values(?,?,?,?)', post, function (error, results, fields) {
    if (error) throw error;
    res.redirect('/zaloguj');
  });
});

//http://localhost:3000/delete?login=Admin&userToDelete=AndrzejTomczynski
router.all('/delete', function(req, res, next) {
  var post = [req.query.userToDelete];
  var query = connection.query('delete from user where login=?', post, function (error, results, fields) {
    if (error) throw error;
    if(req.query.login == undefined) res.redirect('/'); //in case of deleting own account
    else res.redirect('/?login='+req.query.login);  //case: admin delete somebody
  });
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


module.exports = router;
