var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
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
