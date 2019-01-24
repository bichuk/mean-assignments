var express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var EmployeeCart = require('../models/cart.model');

router.get('/', function (req, res, next) {
    EmployeeCart.find().exec(function (err, doc) {
        if (err) return res.status(500).json({ error: err });
        else return res.status(200).json(doc);
    });
});

router.get('/viewEmployeeCart/:userId', function (req, res, next) {
    var userId = new ObjectId(req.params["userId"]);    
 
    EmployeeCart.findOne({ userId: userId }).exec(function (err, doc) {
        if (err) return res.status(500).json({ error: err });
        else {
            if (doc == null) {
                return res.status(500).json([]);
            }
            return res.status(200).json(doc.cartItems);
        }
    });
});

router.post('/addToCart', function (req, res) {
    var userId = new ObjectId(req.body.userId); 
    var userName = req.body.userName;   

    var productId = req.body.productId;
    var name = req.body.name;
    var price = req.body.price;
    var description = req.body.description;
    var quantity = req.body.quantity;

    var cartItem = {
        productId: productId,
        name: name,
        price: price,
        description: description,
        quantity: quantity
    };

    EmployeeCart.findOne({ userId: userId }, function (err, doc) {
        if (err) return res.status(500).json({ error: err });
        else {
            if (doc == null) {
                let firstOrder = new EmployeeCart({
                    userId: userId,
                    userName: userName,                    
                    cartItems: []
                });
                firstOrder.cartItems.push(cartItem);
                firstOrder.save(function (err, doc) {
                    if (err) return res.json({ error: err });
                    else return res.status(200).json({ msg: 'Successfully saved!!' });
                });
            }
            else {
                if (!Array.isArray(doc.cartItems)) {
                    doc.cartItems = [];
                }
                doc.cartItems.push(cartItem);

                doc.save(function (err, doc) {
                    if (err) return res.json({ error: err });
                    else return res.status(200).json({ msg: 'Successfully saved!!' });
                });
            }
        }
    });
});

router.post('/updateCartItem', function (req, res) {
    var userId = new ObjectId(req.body.userId);      
    var productId = req.body.productId;
    var quantity = req.body.quantity;

    let qry = { userId: userId, 'cartItems.productId': productId };
    let data = { 'cartItems.$.quantity': quantity };

    EmployeeCart.updateOne(qry, { '$set': data }, function (err, doc) {
        if (err) return res.status(500).json({ error: err });
        if (doc == null) {
            return res.status(500).json({ error: 'Failed to update the cart item!' });
        }
        return res.status(200).json({ msg: 'Successfully updated the cart item!!' });
    });
});

router.post('/deleteCartItem', function (req, res) {
    var userId = new ObjectId(req.body.userId);     
    var productId = req.body.productId;

    let qry = { userId: userId, 'cartItems.productId': productId };

    EmployeeCart.findOne(qry, function (err, doc) {
        if (err) return res.status(500).json({ error: err });
        else {
            if (err) return res.json({ error: err });
            else {
                if (doc == null) {
                    return res.status(500).json({ error: 'Failed to delete the cart item!' });
                }

                let itemIndex = doc.cartItems.findIndex(x => x.productId === productId);
                doc.cartItems.splice(itemIndex, 1);
                doc.save(function (err, doc) {
                    if (err) return res.json({ error: err });
                    if (doc == null) {
                        return res.status(500).json({ error: 'Failed to delete the cart item!' });
                    }
                    else return res.status(200).json({ msg: 'Successfully deleted the cart item!!' });
                });
            }
        }
    });
});

router.post('/clearCart', function (req, res) {
    var userId = new ObjectId(req.body.userId);     

    let qry = { userId: userId };

    EmployeeCart.findOne(qry, function (err, doc) {
        if (err) return res.status(500).json({ error: err });
        else {
            if (err) return res.json({ error: err });
            else {
                if (doc == null) {
                    return res.status(500).json({ error: 'Failed to clear the cart!' });
                }
                
                doc.cartItems = [];
                doc.save(function (err, doc) {
                    if (err) return res.json({ error: err });
                    else return res.status(200).json({ msg: 'Successfully cleared!!' });
                });
            }
        }
    });
});

module.exports = router;
