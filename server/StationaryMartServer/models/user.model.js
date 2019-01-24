var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema ({
    userId: String,
    userName: String,
    password: String,
    userType: String
});

module.exports = mongoose.model('Users', userSchema);