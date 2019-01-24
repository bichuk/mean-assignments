var express = require('express');
var router = express.Router();

var Stationary = require('../models/stationary.model');

router.get('/', function (req, res, next) {
  Stationary.find().exec(function (err, doc) {
    if (err) return res.status(500).json({ error: err });
    else return res.status(200).json(doc);
  });
});

router.get('/viewStationary/:id', function (req, res, next) {
  var id = req.params["id"];

  Stationary.findOne({ _id: id }).exec(function (err, doc) {
    if (err) return res.status(500).json({ error: err });
    else {      
      return res.status(200).json(doc);
    }
  });
});

module.exports = router;
