//import libraries
var express = require('express');
var bodyParser = require('body-parser');
var mongo = require('mongodb');
var monk = require('monk');
var path = require('path');
var http = require('http').Server(app);

//create neccessary objects
var app = express();
var router = express.Router();


//you need to update wp with your own database name
var db = monk('mongodb://imhikarucat:12345abcde@ds127944.mlab.com:27944/clinics_android_asn2');


//use objects in app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req,res,next){
    req.db = db;
    next();
});

////////////////
//STUDENTS
app.use('/', router);

//get all
router.get('/clinics', function(req, res) {
    req.db.collection('clinics').find({},{"limit": 100},function(e,docs){
        res.json(docs);
    });
});

//get by _id
router.get('/clinics/:id', function(req, res){
	req.db.collection('clinics').findOne(req.params.id, function(e, doc){
		res.json(doc);
	})
});

//update (by _id)
router.put('/clinics/:id', function(req, res){
	req.db.collection('clinics').update(
		{_id: req.params.id}, 
		{
			name: req.body.name, 
			rating: req.body.rating,
			address: req.body.address;
			latitute: req.body.latitute,
			longitute: req.body.longitute,
			impression: req.body.impression,
			lead_physician: req.body.lead_physician,
			specialization: req.body.specialization,
			average_price: req.body.average_price,
		});
	req.db.collection('students').findOne(req.params.id, function(e, doc){
		res.json(doc);
	})

});

//delete (by _id)
router.delete('/clinics/:id', function(req, res){
	req.db.collection('clinics').remove({_id: req.params.id}, function(e, doc){
		res.json(doc);
	})
});

//create
router.post('/clinics', function(req, res){

	console.log(req.body);
	req.db.collection('clinics').insert(req.body, function(e, docs){
		res.json(docs);
	});
});
////////////////

module.exports = app;
app.set( 'port', ( process.env.PORT || 8080 ));

// Start node server
app.listen( app.get( 'port' ), function() {
  console.log( 'Node server is running on port ' + app.get( 'port' ));
});
