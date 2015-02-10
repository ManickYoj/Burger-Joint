var mongoose = require('mongoose');

var schema =  mongoose.Schema({
	customerName: { type: String, match: /^([A-Z][a-z]*[ ]?)+$/ },
	items: [{type: mongoose.Schema.ObjectId, ref: 'Burger'}]
});

module.exports = mongoose.model('Order', schema);