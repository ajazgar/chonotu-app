var express = require('express');
var router = express.Router();

var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'password'
});
connection.connect();
connection.query('USE chonotu');

//http://localhost:3000/account?login=Admin
router.get('/account', function(req, res, next) {
  var post = [req.query.login];
	connection.query('select * from user where login=?', post, function (error, rows, fields) {
	    if (error) throw error;
	    res.render('account', { login: rows[0].login, email:rows[0].email, date_of_birth: rows[0].date_of_birth });
	  });
});

//http://localhost:3000/mytickets?login=Admin
router.get('/mytickets', function(req, res, next) {
  var values=[];
  var post = [req.query.login];
  connection.query('SELECT * FROM ticket where login=?', post, function(err, rows, fields) {
        for (var i in rows) {
          var ticket = {
            'eventname':rows[i].eventname,
            'how_many_tickets':rows[i].how_many_tickets,
          };
          values.push(ticket);
      }
      res.render('mytickets', {"values": values});
  });
});


router.get('/', function(req, res, next) {
  var values = [];
  connection.query('SELECT * FROM event', function(err, rows, fields) {
        for (var i=0; i<rows.length; i=i+4) {
          var valuestemp = [];
          for(var j=0; j<4; j++){
            if(i+j>=rows.length) {
              break;
            }
            var person = rows[i+j].eventname;
            valuestemp.push(person);
          }
          values.push(valuestemp)
      }
      res.render('index', {"values": values});
  });
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
    else res.redirect('/listofusers?login='+req.query.login);  //case: admin delete somebody
  });
});


router.get('/listofusers', function(req, res, next) {

if(req.query.userToSearch != undefined){
  var values = [];
  
  var post  = {login: req.query.userToSearch};
  connection.query('SELECT * FROM user where ?', post, function(err, rows, fields) {
            var person = {
              'login':rows[0].login
            };
            values.push(person);
      res.render('listofusers', {"values": values});
  });
}
else{
  var values = [];
  connection.query('SELECT * FROM user', function(err, rows, fields) {
        for (var i in rows) {
          var person = {
            'login':rows[i].login,
            'email':rows[i].email,
            'date_of_birth':rows[i].date_of_birth
          };
          values.push(person);
      }

      res.render('listofusers', {"values": values});
  });
}
  
});



router.get('/about', function(req, res, next) {
  res.render('about', { title: 'Express' });
});

router.all('/buyticket', function(req, res, next) {
  var post = [req.query.eventName];
  connection.query('SELECT ticket_price FROM event where eventname=?', post, function (error, row, fields){
    var cena = row[0].ticket_price;
  console.log(post)
res.render('buyticket',  {post, values: cena});
});
});

router.all('/event', function(req, res, next) {
  var post = [req.query.eventName];
  connection.query('SELECT ticket_price FROM event where eventname=?', post, function (error, row, fields){
    var cena = row[0].ticket_price;
  console.log(post)
  res.render('event', { post, values: cena});
});
});

router.get('/kontakt', function(req, res, next) {
  res.render('kontakt', { title: 'Express' });
});



module.exports = router;
