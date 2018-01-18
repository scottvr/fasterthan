var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
	res.render('index', { title: 'FasterThan'});
});

router.get('/check_zero60', function(req,res) {
//var sanitizer = require('sanitizer'); 
//var sortby = sanitizer.escape(req.params.sortby);
	//if(sortby) 
	//	res.render('check_zero60t', { title: 'Compare your 0-60 time to the database' });
//	else 
		res.render('check_zero60', { title: 'Compare your 0-60 time to the database' });
}); 

router.get('/scheck_zero60', function(req,res) {
	res.render('scheck_zero60', { title: 'Compare your 0-60 time to the database' });
}); 

router.get('/check_zero60t', function(req,res) {
	res.render('check_zero60t', { title: 'Compare your 0-60 time to the database' });
}); 

router.post('/check_zero60t', function(req,res) {
	var db = req.db;
	var time = req.body.inputTime;
	var total;
	var wrap = require('co-monk');
	var place;

	var collection = db.get('cars');
	var cars = wrap(db.get('cars'));
	cars.count({}, function(e, n) {
    		console.log('found '+n+' '+cars); total=n} );
	

	collection.find( { "zero60": { "$gt" : parseFloat(time)}   }, {sort: {zero60: 1}}, function (err,docs) {
		if(err)
			res.send("blah");
		else { 
			place = (total - parseInt(docs.length)); 
		        	
			res.render('results', {
				"place" : place,
				"total" : total ,
				"results" : docs } );
		}
	});
});


router.post('/check_zero60', function(req,res) {
	var db = req.db;
	var time = req.body.inputTime;
	var total;
	var wrap = require('co-monk');
	var place;

	var collection = db.get('cars');
	var cars = wrap(db.get('cars'));
	cars.count({}, function(e, n) {
    		console.log('found '+n+' '+cars); total=n} );
	

	collection.find( { "zero60": { "$gt" : parseFloat(time)}   }, {sort: {year: -1}}, function (err,docs) {
		if(err)
			res.send("blah");
		else { 
			place = (total - parseInt(docs.length)); 
		        	
			res.render('results', {
				"place" : place,
				"total" : total ,
				"results" : docs } );
		}
	});
});

router.post('/scheck_zero60', function(req,res) {
	var db = req.db;
	var time = req.body.inputTime;
	var total;
	var wrap = require('co-monk');
	var place;

	var collection = db.get('cars');
	var cars = wrap(db.get('cars'));
	cars.count({}, function(e, n) {
    		console.log('found '+n+' '+cars); total=n} );
	

	collection.find( { "zero60": { "$lte" : parseFloat(time)}   }, {sort: {zero60: 1}}, function (err,docs) {
		if(err)
			res.send("blah");
		else { 
			place = (total - parseInt(docs.length)); 
		        	
			res.render('sresults', {
				"place" : place,
				"total" : total ,
				"results" : docs } );
		}
	});
});

router.get('/show_zero60', function(req,res) {
	var db = req.db;

	var cars = db.get('cars');

	cars.find( { }, {sort: {"zero60": 1}}, function (err,docs) {
		if(err)
			res.send("blah");
		else { 
			res.render('show_zero60', {
				"results" : docs } );
		}
	});
});

module.exports = router;
