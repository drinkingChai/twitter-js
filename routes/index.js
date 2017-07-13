const express = require('express');
const router = express.Router();
const tweetBank = require('../tweetBank');

router.get('/', function (req, res) {
	// res.render calls next automatically
  let tweets = tweetBank.list();
	res.render('index', { tweets: tweets, showForm: true });
});

router.get('/users/:name', function(req, res) {
  var name = req.params.name;
  var list = tweetBank.find({ name: name });
  res.render('index', { tweets: list, name: name, showForm: true });
})

router.get('/tweets/:id', function(req, res) {
	var id = Number(req.params.id);
	var tweet = tweetBank.find({ id: id });
	res.render('index', { tweets: tweet });
})

router.post('/tweets', function(req, res) {
	var name = req.body.name
	var text = req.body.text;
	tweetBank.add( name, text );
	io.sockets.emit('newTweet', { blah: 'blah blah' });
	res.redirect('/');
})

// module.exports = router;
module.exports = function(io) {
	return router;
}
