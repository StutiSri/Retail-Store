var mongoose = require('mongoose');
var userSchema = require('./userSchema');

var User = mongoose.model('User', userSchema);

var user = new User