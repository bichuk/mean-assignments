var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var stationarySchema = new Schema ({
    name: String,
	description: String,
	price: String,
	manufacturer : String
});

module.exports = mongoose.model('Stationaries', stationarySchema);