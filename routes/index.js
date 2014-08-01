var express = require('express');
var router = express.Router();

var ObjectId = require('mongodb').ObjectID;

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/ridelist', function(req, res) {
    var db = req.db;
    db.collection('rides').find().toArray(function (err, items) {
        res.json(items);
    });
});

router.post('/addride', function(req, res) {
    var db = req.db;
    db.collection('rides').insert(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});

router.post('/addPassenger', function(req, res) {
    var db = req.db;

    var rideId = req.body.rideId;
    var newPassenger = req.body.newPassenger;

    db.collection('rides').update ({_id : ObjectId(rideId)}, {'$push': {passengers : newPassenger}}, function (err, result)
	//db.collection('rides').find( { _id: ObjectId(rideId) }, function (err, result)
	{
		res.send({ok:'ok', rideId:rideId, newPassenger:newPassenger, res: result});

	} );

    
});


router.delete('/deleteride/:id', function(req, res) {
    var db = req.db;
    var rideToDelete = req.params.id;
    db.collection('rides').removeById(rideToDelete, function(err, result) {
        res.send((result === 1) ? { msg: '' } : { msg:'error: ' + err });
    });
});



module.exports = router;
