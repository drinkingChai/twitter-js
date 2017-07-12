const express = require( 'express' );
const chalk = require( 'chalk' );
const chokidar = require('chokidar');
const nunjucks = require('nunjucks');
const app = express();


var locals = {
	title: 'An Example',
	people: [
		{ name: 'Gandalf' },
		{ name: 'Frodo' },
		{ name: 'Hermoine' }
	]
}

app.set('view engine', 'html');
app.engine('html', nunjucks.render);
nunjucks.configure('views', {
	// nunjucks.configure must come after app.engine & app.set
	express: app,
	noCache: true
})


app.use(function(req, res, next) {
	console.log(chalk.cyan(req.method), chalk.magenta(req.url), chalk.magenta(res.statusCode));
	next();
})


app.get('/', function (req, res) {
	// res.render calls next automatically
	res.render('index', locals);
});

app.get('/special/', function(req, res, next) {
	console.log('you reached a special area');
	next();
})



var port = process.env.PORT || 3000;
app.listen(port, function() {
	console.log(chalk.cyan('listening on port ' + chalk.yellow(port)));
});
