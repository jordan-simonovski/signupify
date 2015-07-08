var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Signupify' });
});

router.get('/attendees', function(req, res){
	var db = req.db;
	var collection = db.get('usercollection');
	collection.find({}, {}, function(e, attendees){
		res.render('attendees', {
			"attendees": attendees
		});
	});
});

/* POST to add attendee */
router.post('/addAttendee', function(req, res){

	//Setup db variable
	var db = req.db;

	//Get form values
	var name = req.body.name;
	var email = req.body.email;

	//Set our collection
	var collection = db.get('usercollection');

	//Submit to the DB
	collection.insert({
		"name": name, 
		"email": email 
	}, function(err, doc) {
		if (err) {
			//if it failed, return error
			res.send('There was a problem adding the information to the database');
		} else {
			// If it worked, set the header so the address bar doesn't still say add user
			res.location('Attendees');
			// And forward to attendees page
			res.redirect('Attendees');
		}
	});
});


module.exports = router;
