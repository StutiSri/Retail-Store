var express = require('express');
var status = require('http-status');

module.exports = function(wagner){
	var api = express.Router();

	api.get('/category/id/:id', 
				wagner.invoke(function(Category){
					return func(req, res){
						Category.fincOne({_id : req.params.id},
										  func(error, category){
										  	if (error){
										  		return res.
										  			status(status.INTERNAL_SERVER_ERROR).
										  			json({error : error.toString()});
										  	}
										  	if(!category){
										  		return res.
										  			status(status.NOT_FOUND).
										  			json({error : 'Category not found'});	
										  	}
										  	res.json({category : category});
										  });
					};
				}));
	
	return api;
};