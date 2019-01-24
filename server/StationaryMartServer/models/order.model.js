var statusTypes = ['Pending', 'Approved', 'Denied'];
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var orderProduct = new Schema ({
	productId: String,
	name: { type: String, required: true },
	description: String,
	price: { type: Number, required: true },
	quantity: { type: Number, required: true }
});

var order = new Schema ({	
    userId: Schema.Types.ObjectId,
    userName: String,
	orderId: Schema.Types.ObjectId,
	products: [orderProduct] = [],
	orderDate:  { type: Date, default: Date.now() },
	orderStatus: { type: String, required: true, enum: statusTypes },
	orderStatusDate: Date
});
module.exports = mongoose.model('Orders', order);