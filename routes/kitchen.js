var Order = require('../model/orders');

module.exports = function (req, res) {
	var pageData = {
		page_title: 'Kitchen',
		incl_js: ['kitchen-fe']
	};

	// Populate the items field
	Order.find().sort({name: 1}).populate('items').exec(function (err, orders) {
		if (err) return res.sendStatus(500);

		var options = {
	      path: 'items.ingredients',
	      model: 'Ingredient'
	    };

	    // Populate the nested ingredients field
		Order.populate(orders, options, function (err, orders) {
			if (err) return res.sendStatus(500);
			pageData.order = orders;
			res.render('kitchen', pageData);
		});
	});
};

module.exports.complete = function (req, res) {
	var rq = req.body;
	console.log(rq.id);
	Order.findOneAndRemove({_id: rq.id}, {}, function (err, order) {
		if (err) res.sendStatus(500);

		res.json({ 
			id: order.id
		});
	});
};

