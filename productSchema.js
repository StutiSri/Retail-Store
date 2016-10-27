var mongoose = require('mongoose');
var Category = require('./categorySchema');
var fx = require('./fx');

var productSchema = {
        name : {
                type : String,
                required : true
        },
        pictures : {
                type : String,
                match : /^http:\/\//i
        },
        price : {
                amount : {
                        type : Number,
                        required : true,
                        set : function(v){
                                this.internal.approximatePriceINR =
                                        v / (fx() [this.price.currency] || 1);
                                return v;
                        }
                },
                currency : {
                        type : String,
                        enum = ['USD', 'EUR', 'INR'],
                        required : true,
                        set : function(v){
                                this.internal.approximatePriceINR =
                                        this.price.amount / (fx()[v] || 1);
                                return v;

                        }
                }
        },
        category : Category.categorySchema,
        internal : {
                approximatePriceINR : Number
        }
};

var Schema = new mongoose.Schema(productSchema);

var currencySymbols = {
        'USD' : '$',
        'EUR' : '€',
        'INR' : '₹'
}

/*
* Human-readbale string like $5
*
*/
schema.virtual('displayPrice'.get(function(){
        return currencySymbols[this.price.currency] 
                + '' + this.price.amount;
}));

schema.set('toObject', {virtuals : true});
schema.set('toJSON', {virtuals : true});

module.exports = schema;
module.exports.productSchema = productSchema;