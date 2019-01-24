var express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var EmployeeOrder = require('../models/order.model');

router.get('/', function (req, res, next) {
    let qry = { 'orderStatus': 'Pending' };
    let result = { "orders.$": 1, "userId": 1 };

    //Projection example..here query returns just the matching orders
    EmployeeOrder
        .find(qry)
        .exec(function (err, doc) {
            if (err) return res.status(500).json({ error: err });
            else return res.status(200).json(doc);
        });
});

router.post('/updateOrderStatus', function (req, res) {
    var userId = new ObjectId(req.body.userId);
    var orderId = new ObjectId(req.body.orderId);
    var orderStatus = req.body.orderStatus;

    let qry = { userId: userId, orderId: orderId };
    let data = { orderStatus: orderStatus, 'orderStatusDate': Date.now() };

    EmployeeOrder.update(qry, { '$set': data }, function (err, doc) {
        if (err) return res.status(500).json({ error: err });
        if (doc == null) {
            return res.status(500).json({ error: 'Failed to update the order status!' });
        }
        return res.status(200).json({ msg: 'Successfully updated the order status!!' });
    });
});

// router.post('/updateOrderStatus', function (req, res) {
//     var userId = new ObjectId(req.body.userId);
//     var orderId = new ObjectId(req.body.orderId);
//     var orderStatus = req.body.orderStatus;

//     let qry = { userId: userId, orderId: orderId };
//     let data = { 'orders.$.orderStatus': orderStatus, 'orders.$.orderStatusDate': Date.now() };

//     EmployeeOrder.update(qry, { '$set': data }, function (err, doc) {
//         if (err) return res.status(500).json({ error: err });
//         if (doc == null) {
//             return res.status(500).json({ error: 'Failed to update the order status!' });
//         }
//         return res.status(200).json({ msg: 'Successfully updated the order status!!' });
//     });
// });

module.exports = router;
