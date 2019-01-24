var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var cartProduct = new Schema ({
	productId: String,
	name: { type: String, required: true },
	description: String,
	price: { type: Number, required: true },
	quantity: { type: Number, required: true }
});
var cartSchema = new Schema ({    
	userId: String,
	userName: String,		
	cartItems : [cartProduct] = []
});
module.exports = mongoose.model('CartItems', cartSchema);
