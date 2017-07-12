const express = require( 'express' );
const chalk = require( 'chalk' );
const chokidar = require('chokidar');
const nunjucks = require('nunjucks');
const routes = require('./routes');
const app = express();

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

// implementation for static middleware to public
const path = require('path');
app.use(function(req, res, next) {
	var filePath = path.resolve('public' + req.url);
	res.sendFile(filePath, function(err) {
		if (err) next();
	})
})

// app.use(express.static('public'));	//equivalent of middleware above
app.use('/', routes);


var port = process.env.PORT || 3000;
app.listen(port, function() {
	console.log(chalk.cyan('listening on port ' + chalk.yellow(port)));
});
