const express 	  = require('express');
const bodyParser  = require('body-parser');
const app     	  = express();
const MongoClient = require('mongodb').MongoClient;

var db

MongoClient.connect('mongodb://ebmzellwk:2626@ds135747.mlab.com:35747/zellwkcrud', (err, database) => {
	if (err) return console.log(err);
	db = database
	app.listen(3000, function() {
	console.log('You are listening on port 3000');
  })
})

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'))
app.use(bodyParser.json())

app.get('/', (req, res) => {
	 db.db('zellwkcrud').collection('quotes').find().toArray(function(err, result) {
	 	if (err) return console.log(err);
	 	res.render('index.ejs', {quotes: result})
	})
})

app.post('/quotes', (req, res) => {
  db.db('zellwkcrud').collection('quotes').save(req.body, (err, result) => {
    if (err) return console.log(err)

    console.log('saved to database')
    res.redirect('/')
  })
})

app.put('/quotes', (req, res) => {
  db.db('zellwkcrud').collection('quotes')
  .findOneAndUpdate({name: 'Yoda'}, {
    $set: {
      name: req.body.name,
      quote: req.body.quote
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})
