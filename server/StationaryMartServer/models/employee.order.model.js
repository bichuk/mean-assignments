var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var orderProduct = new Schema ({
	productId: String,
	name: { type: String, required: true },
	description: String,
	price: { type: Number, required: true },
	quantity: { type: Number, required: true }
});
var employeeOrderSchema = new Schema ({    
	userId: String,
	userName: String,		
	cartItems : [orderProduct] = []
});
module.exports = mongoose.model('EmployeeOrders', employeeOrderSchema);
