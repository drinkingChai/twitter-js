const express = require( 'express' );
const chalk = require( 'chalk' );
const app = express();


app.use(function(req, res, next) {
	console.log(chalk.cyan(req.method), chalk.magenta(req.url), chalk.blue(res.statusCode));
	next();
})


app.get('/', function (req, res, next) {
	next();
});

app.get('/special/', function(req, res, next) {
	console.log(chalk.pink('you reached a special area'));
	next();
})



var port = process.env.PORT || 3000;
app.listen(port, function() {
	console.log(chalk.green('listening on port ' + port));
});
