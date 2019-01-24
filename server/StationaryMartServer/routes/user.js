var express = require('express');
var router = express.Router();

var User = require('../models/user.model');

router.get('/', function (req, res, next) {
  User.find().exec(function (err, doc) {
    if (err) return res.status(500).json({ error: err });
    else return res.status(200).json(doc);
  });
});

router.post('/login', function (req, res, next) {
  let user = req.body;  

  User.findOne({ userId: user.userId, password: user.password }).exec(function (err, doc) {
    if (err) return res.status(500).json({ error: 'User name/password is incorrect!' });
    else {
      if (doc == null) {
        return res.status(500).json({ error: 'User name/password is incorrect!' });
      }
      return res.status(200).json(doc);
    }
  });
});

router.post('/addUser', function (req, res) {
  var appuser = new User(req.body);
  appuser.save(function (err, user) {
    if (err) return res.status(500).json({ error: err });
    return res.status(200).json(user);
  });
});

module.exports = router;
