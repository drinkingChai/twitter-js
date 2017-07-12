const express = require( 'express' );
const chalk = require( 'chalk' );
const app = express(); //creates an instande of an express application


app.listen(3000);

app.use(function(req, res, next){
	console.log(chalk.blue(req.body))
	next();
});

app.get('/', function (req, res){
	res.send('Hello, guest!');
});

