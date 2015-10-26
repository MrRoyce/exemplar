'use strict';

var GroceryItem = require('./../models/GroceryItem.js');

module.exports = (app) => {

	app.route('/api/items')
	// Get all items
	.get((req, res) => {
		GroceryItem.find((error, doc) => {
			res.send(doc);
		});

	})
	// Save an item
	.post((req, res) => {
		var
      item          = req.body,
			groceryItem   = new GroceryItem(item)
		;

		groceryItem.save(() => {
			res.status(201).send();
		});
	});

	app.route('/api/items/:id')
	.delete((req, res) => {
		GroceryItem.findOne({
			_id : req.params.id

		}).remove((err) => {
			if (err) {
				console.log('Error ' + err);
			}

			res.status(200).send();
		});
	})
	.patch((req, res) => {

		GroceryItem.findOne({
			_id : req.body._id
		}, (error, doc) => {

			for (var key in req.body) {
				doc[key] = req.body[key];
			}
			doc.save();

			res.status(200).send();
		});
	});
};
