const express = require( 'express' );
const app = express(); //creates an instande of an express application

app.listen(3000);

app.get('/', function (req, res){
	res.send('Hello, guest!')
})