var mongoose = require('mongoose');

module.exports = function(wagner){
	/**
	* it connects to a MongoDB,
	**/
	mongoose.connect('mongodb://localhost:27017/test');

	/**
	*creates a Mongoose model by including the schema
	**/
	var Category = mongoose.model('Category', require('./categorySchema')
						, 'categories');
	/**
	* registers the category service with Wagner.
	**/
	wagner.factory('Category', function(){
		return Category;
	});

	return {
		Category : Category
	};
};