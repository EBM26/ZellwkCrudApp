const express 	  = require('express');
const bodyParser  = require('body-parser');
const MongoClient = require('mongodb').MongoClient;



const app     	 = express();

app.use(bodyParser.urlencoded({extended: true}))

var db

MongoClient.connect('mongodb://ebmzellwk:2626@ds135747.mlab.com:35747/zellwkcrud', (err, database) => {
	if (err) return console.log(err);
	db = database;
	app.listen(3000, function() {
	console.log('You are listening on port 3000');
  })
})

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html')
})

app.post('/quotes', (req, res) => {
	console.log('HELLLLLLLOOOOO')
})

