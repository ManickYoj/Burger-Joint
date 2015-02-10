var mongoose = require('mongoose');

var schema =  mongoose.Schema({
	name: { type: String, unique: true, match: /^([A-Z][a-z]*[ ]?)+$/ },
	price: { type: Number,  min: 0 },
	quantity: { type: Number, min: 0 }
});

module.exports = mongoose.model('Ingredient', schema);