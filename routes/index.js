var express = require('express');
var router = express.Router();
var ObjectId = require('mongodb').ObjectID;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});



router.get('/contactlist', function (req, res){
	console.log("contactlist get request");

	var db = req.app.settings.db;

	db.collection('contactlist', function(err, docs) {
		docs.find().toArray(function (err, allUsers){
			//console.log("allUsers:  "+allUsers.length);
			//console.log( JSON.stringify(allUsers) );
			var jsonObj = JSON.stringify(allUsers);
			res.json(allUsers);
		});
		
		
	});

});


router.post('/contactlist', function (req, res){
	console.log(req.body);
	var name = req.body.name;
	//console.log("req.body.name= "+name);
	var email = req.body.email;
	var number = req.body.number;

	var db = req.app.settings.db;
	db.collection('contactlist', function (err, contacts) {

      var newUser = {
        name: name,
        email: email, 
        number: number
      };

      	contacts.insert(newUser, {w:1}, function (err, result) {
        		if (err) throw err;
        		res.json(result);
        		
  		});
     });


});

	router.delete('/contactlist/:id', function (req, res){
		var id = req.params.id;
		var objId = new ObjectId(id);
		console.log("id from server file: "+ id);
		var db = req.app.settings.db;

		db.collection('contactlist', function (err, docs){
			docs.remove({_id:objId}, {w:1}, function (err, newDoc){
				res.json(newDoc);
			});
	    });

	});	

	router.get('/contactlist/:id', function (req, res){
		console.log("contactlist called from server");
			var id = req.params.id;
			var objId = new ObjectId(id);
			console.log("id from server file: "+ id);
			var db = req.app.settings.db;

			db.collection('contactlist', function(err, docs) {
				docs.findOne({_id:objId}, function (err, oneDoc){
				//console.log(oneDoc);
				res.json(oneDoc);
		});
		
		
		});
	});


router.put('/contactlist/:id', function (req, res) {
	//id come across on the url
	var id = req.params.id;
	var objId = new ObjectId(id);
	//name, email, and number are included in the body
	var name = req.body.name;
	var email = req.body.email;
	var number = req.body.number;
	console.log("name: "+name);

	var db = req.app.settings.db;
	db.collection('contactlist', function (err, docs){
		docs.update({_id:objId}, {$set:
			{
				name:name,
				email:email, 
				number:number
			}}, function (err, result){
				res.json(result);
			});

		});
});


module.exports = router;
