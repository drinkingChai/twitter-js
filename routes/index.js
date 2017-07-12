const express = require('express');
const router = express.Router();
const tweetBank = require('../tweetBank');

router.get('/', function (req, res) {
	// res.render calls next automatically
  let tweets = tweetBank.list();
	res.render('index', { tweets: tweets});
});

module.exports = router;
