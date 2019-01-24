'use strict'
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var ObjectId = require('mongoose').Types.ObjectId;

var EmployeeOrder = require('../models/employee.order.model');

router.get('/', function (req, res, next) {
  EmployeeOrder.find().exec(function (err, doc) {
    if (err) return res.status(500).json({ error: err });
    else return res.status(200).json(doc);
  });
});

router.get('/viewEmployeeOrders/:userId', function (req, res, next) {
  var userId = new ObjectId(req.params["userId"]);

  EmployeeOrder.findOne({ userId: userId }).exec(function (err, doc) {
    if (err) return res.status(500).json({ error: err });
    else {
      return res.status(200).json(doc.orders);
    }
  });
});

router.post('/placeOrder', function (req, res) {
  var userId = new ObjectId(req.body.userId);
  var userName = req.body.userName;
  var products = req.body.products;

  var newOrder = {
    orderId: new mongoose.Types.ObjectId(),
    products: [],
    orderDate: Date.now(),
    orderStatus: "Pending",
    orderStatusDate: null
  };
  products.forEach(product => {
    newOrder.products.push(product);
  });

  EmployeeOrder.findOne({ userId: userId }, function (err, doc) {
    if (err) return res.status(500).json({ error: err });
    else {
      if (doc == null) {
        let firstOrder = new EmployeeOrder({
          userId: userId,
          userName: userName,
          orders: [],
          cartItems: []
        });
        firstOrder.orders.push(newOrder);
        firstOrder.save(function (err, doc) {
          if (err) return res.json({ error: err });
          else return res.status(200).json({ msg: 'Successfully saved!!' });
        });
      }
      else {
        if (!Array.isArray(doc.orders)) {
          doc.orders = [];
        }
        doc.orders.push(newOrder);
        doc.save(function (err, doc) {
          if (err) return res.json({ error: err });
          else return res.status(200).json({ msg: 'Successfully saved!!' });
        });
      }
    }
  });
});

router.post('/updateOrderItem', function (req, res) {
  var userId = new ObjectId(req.body.userId);
  var orderId = req.body.orderId;
  var productId = req.body.productId;
  var quantity = req.body.quantity;
  
  EmployeeOrder.findOneAndUpdate(
    { _id: req.body.userId, 'orders.orderId': new ObjectId(orderId), 'orders.products.productId': productId },
    { $set: { 'orders.0.products.0.quantity': quantity } },{ new : true },
    function (err, doc) {
      if (err) return res.status(500).json({ error: err });
      if (doc == null) {
        return res.status(500).json({ error: 'Failed to update the order!' });
      }
      return res.status(200).json(doc);
    }
 );
});

//For testing purpose..
// EmployeeOrder.find(qry).exec(function (err, doc) {
//   if (err) return res.status(500).json(doc);
//   else return res.status(200).json(doc);
// }); 

router.post('/deleteOrderItem', function (req, res) {
  var userId = req.body.userId;
  var orderId = new ObjectId(req.body.orderId);
  var productId = req.body.productId;  

  let qry = { '_id': userId, 'orders.orderId': orderId, "orders.products.productId": productId };    

  // EmployeeOrder.findOneAndUpdate({ _id: req.body.userId , 'orders.orderId': new ObjectId(orderId) },{ multi: true, new : true },
  //   { $pull: { products : { productId: req.body.productId }}}, function(err, data){
  //   console.log(err, data);
  //   return res.status(200).json(data);
  // });

  // EmployeeOrder.update(qry,
  // { $pull: {'productId.$.products':  {'productId': productId}}  },
  // {multi: true}, function(err, data){
  //     console.log(err, data);
  //     return res.status(200).json(data);
  //   });
    
  EmployeeOrder.findOne(qry).exec(function (err, doc) {
    if (err) return res.status(500).json({ error: err });
    else {
        //let itemIndex = doc.orders[0].products.findIndex(x => x.productId.toString() === productId.toString());
        //let updatedProductsArray = doc.orders[0].products.splice(itemIndex, 1);    
        doc.orders[0].orderStatus="hello";
        doc.save(function (err, doc) {
          if (err) return res.json({ error: err });
          else return res.status(200).json({ msg: 'Successfully saved!!' });
        });
      //   EmployeeOrder.update({ '_id': userId, 'orders.orderId': orderId }, { $push: { products: { $each: updatedProductsArray } } }, function (err, doc) {
      //     if (err) return res.status(500).json({ error: err });
      //     if (doc == null) {
      //         return res.status(500).json({ error: 'Failed to update the products array!' });
      //     }
      //     return res.status(200).json({ msg: 'Successfully updated the products array!!' });
      // });         
    }
});
});

router.post('/deleteOrder', function (req, res) {
  var userId = new ObjectId(req.body.userId);
  var orderId = new ObjectId(req.body.orderId);

  let qry = { userId: userId, 'orders.orderId': new ObjectId(orderId) };

  EmployeeOrder.findOne(qry, function (err, doc) {
    if (err) return res.status(500).json({ error: err });
    else {
      if (err) return res.json({ error: err });
      else {
        if (doc == null) {
          return res.status(500).json({ error: 'Failed to delete the order!' });
        }
        let itemIndex = doc.orders.findIndex(x => x.orderId.toString() === orderId.toString());
        doc.orders.splice(itemIndex, 1);
        doc.save(function (err, doc) {
          if (err) return res.json({ error: err });
          else return res.status(200).json({ msg: 'Successfully deleted the order!!' });
        });
      }
    }
  });
});

module.exports = router;
