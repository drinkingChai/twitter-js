const express = require('express');
const router = express.Router();
const tweetBank = require('../tweetBank');

router.get('/', function (req, res) {
	// res.render calls next automatically
  let tweets = tweetBank.list();
	res.render('index', { tweets: tweets });
});

router.get('/users/:name', function(req, res) {
  var name = req.params.name;
  var list = tweetBank.find({ name: name });
  res.render('index', { list: list });
})

module.exports = router;
