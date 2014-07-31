var express = require('express');
var router = express.Router();

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

router.delete('/deleteride/:id', function(req, res) {
    var db = req.db;
    var rideToDelete = req.params.id;
    db.collection('rides').removeById(rideToDelete, function(err, result) {
        res.send((result === 1) ? { msg: '' } : { msg:'error: ' + err });
    });
});



module.exports = router;
