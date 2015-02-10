var Ingredient = require('../model/ingredients');
var Order = require('../model/orders');
var Burger = require('../model/burger');

module.exports = function (req, res) {
	var pageData = {
		page_title: 'Order',
		incl_js: ['customer-fe']
	};

	Ingredient.find().sort({name: 1}).exec(function (err, ingredients) {
		if (err) return res.sendStatus(500);
		pageData.ingredient = ingredients;
		res.render('customer', pageData);
	});
};

module.exports.order = function (req, res) {
	var rq = req.body;
	rq.ingredients = JSON.parse(rq.ingredients);
	Burger.create({ingredients: rq.ingredients}, function (err, burger) {
		if (err) return res.sendStatus(500);
		console.log(burger);

		Order.create({customerName: rq.customerName, items: [burger]}, function (err, order) {
			console.log(order);
			console.log(err);
			if (err) return res.status(500).render('partials/alert', { 
				layout: false,
				alert: {
					type: 'danger',
					summary: 'Order Failed.',
					description: 'Customer name must be composed of words with the first letter of each capitalized. ' +
								 'No special characters or numbers are allowed.'
				}
			});

			res.render('partials/alert', { 
				layout: false,
				alert: {
					type: 'success',
					summary: 'Congratulations.',
					description: 'Your click has caused the creation of delicious burgers, en route to your mouth.'
				}
			});
		});
	});
};

