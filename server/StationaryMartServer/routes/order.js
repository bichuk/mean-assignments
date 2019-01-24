var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var ObjectId = require('mongoose').Types.ObjectId;

var EmployeeOrder = require('../models/order.model');

router.get('/', function (req, res, next) {
    EmployeeOrder.find().exec(function (err, doc) {
        if (err) return res.status(500).json({ error: err });
        else return res.status(200).json(doc);
    });
});

router.get('/viewEmployeeOrders/:userId', function (req, res, next) {
    var userId = new ObjectId(req.params["userId"]);        
    EmployeeOrder.find({ userId: userId }).exec(function (err, doc) {
        if (err) return res.status(500).json({ error: err });
        else {
            return res.status(200).json(doc);
        }
    });
});

router.post('/placeOrder', function (req, res) {
    var userId = new ObjectId(req.body.userId);
    var userName = req.body.userName;
    var products = req.body.products;
  
    var newOrder = new EmployeeOrder ({
      userId: userId,
      userName: userName,
      orderId: new mongoose.Types.ObjectId(),
      products: [],
      orderDate: Date.now(),
      orderStatus: "Pending",
      orderStatusDate: null
    });
    products.forEach(product => {
      newOrder.products.push(product);
    });

    newOrder.save(function (err, doc) {
        if (err) return res.json({ error: err });
        if (doc == null) {
            return res.status(500).json({ error: 'Failed to complete the order!' });
          }
        else return res.status(200).json({ msg: 'Order has been placed successfully!!' });
      });
  });
  
  router.post('/updateOrderItem', function (req, res) {
    var userId = new ObjectId(req.body.userId);
    var orderId = new ObjectId(req.body.orderId);
    var productId = req.body.productId;
    var quantity = req.body.quantity;

    var qry = { userId: userId, 'orderId': orderId, 'products.productId': productId };
    EmployeeOrder.findOneAndUpdate(qry,
      { $set: { 'products.0.quantity': quantity } },{ new : true },
      function (err, doc) {
        if (err) return res.status(500).json({ error: err });
        if (doc == null) {
          return res.status(500).json({ error: 'Failed to update the order!' });
        }
        return res.status(200).json(doc);
      }
   );
  });
  //mongoose.set('debug', true);
  //For testing purpose..
  // EmployeeOrder.find(qry).exec(function (err, doc) {
  //   if (err) return res.status(500).json(doc);
  //   else return res.status(200).json(doc);
  // }); 
  
  router.post('/deleteOrderItem', function (req, res) {
    var userId = new ObjectId(req.body.userId);
    var orderId = new ObjectId(req.body.orderId);
    var productId = req.body.productId;    

    let qry = { userId: userId, orderId: orderId };  

    EmployeeOrder.findOne(qry, function (err, doc) {
        if (err) return res.status(500).json({ error: err });
        else {
          if (err) return res.json({ error: err });
          else {
            if (doc == null) {
              return res.status(500).json({ error: 'Failed to delete the order item!' });
            }
            let itemIndex = doc.products.findIndex(x => x.productId.toString() === productId.toString());
  
            doc.products.splice(itemIndex, 1);
            doc.save(function (err, doc) {
              if (err) return res.json({ error: err });
              else return res.status(200).json({ msg: 'Successfully deleted the order item!!' });
            });
          }
        }
      }); 
  });
  
  router.post('/deleteOrder', function (req, res) {
    var userId = new ObjectId(req.body.userId);
    var orderId = new ObjectId(req.body.orderId);
  
    let qry = { userId: userId, orderId: orderId };
    
    EmployeeOrder.deleteOne(qry, function (err, doc) {
        if (err) return res.json({ error: err });
        if (doc == null) {
            return res.status(500).json({ error: 'Failed to delete the order!' });
          }
        else return res.status(200).json({ msg: 'Successfully deleted the order!!' });
    });    
});

module.exports = router;
