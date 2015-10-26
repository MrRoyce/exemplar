'use strict';

const mongoose = require('mongoose'),
	  GroceryItem = require('./models/GroceryItem.js')

let items = [
		{
		    name: 'Ice Cream'
		}, {
			name: 'Waffles'
		}, {
		    name: 'Candy',
		    purchased: true
		}, {
			name: 'Snarks'
		}, {
			name: 'Fruit'
		}
	]

try {
	mongoose.connect('mongodb://localhost/grocery', (error) => {
		if (error) {
			console.error('System error - Could not connect to mongoose:' + error);
		} else {
			console.log('Connected to MongoDB');

			mongoose.connection.db.dropDatabase(); //kludge to drop db each time the server is restarted
			// so that the items are not added again and again
			items.forEach((item) => {
				new GroceryItem(item).save();
			})

		}

		
	})
} catch (err) {
	console.log('System Error - Mongoose connection failed: ' , err.message);
}