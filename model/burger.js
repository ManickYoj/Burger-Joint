var mongoose = require('mongoose');

var schema =  mongoose.Schema({
	ingredients: [{type: mongoose.Schema.ObjectId, ref: 'Ingredient'}]
});

module.exports = mongoose.model('Burger', schema);