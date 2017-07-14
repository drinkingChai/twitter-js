const express = require( 'express' );
const socketio = require('socket.io');
const chalk = require( 'chalk' );
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser');
const routes = require('./routes');
const app = express();

app.set('view engine', 'html');
app.engine('html', nunjucks.render);
nunjucks.configure('views', {
	// nunjucks.configure must come after app.engine & app.set
	express: app,
	noCache: true
})

app.use(bodyParser.urlencoded({ extended: false }));
app.use(function(req, res, next) {
	console.log(chalk.cyan(req.method), chalk.magenta(req.url), chalk.magenta(res.statusCode));
	next();
})

// implementation for static middleware to public
const path = require('path');
var myStatic = function(myPath) {
	return function(req, res, next) {
		var filePath = path.resolve(myPath + req.url);
		res.sendFile(filePath, function(err) {
			if (err) next();
		})
	}
}


app.use(myStatic('public'));

// app.use(express.static('public'));	//equivalent of middleware above
var port = process.env.PORT || 3000;
var server = app.listen(port, function() {
	console.log(chalk.cyan('listening on port ' + chalk.yellow(port)));
});
var io = socketio.listen(server);


app.use('/', routes(io));
