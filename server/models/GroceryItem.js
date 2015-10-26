const mongoose = require('mongoose')

var GroceryItemSchema = {
	name     : String,
	purchased: Boolean,
	id       : String
}

module.exports = mongoose.model('GroceryItem', GroceryItemSchema, 'groceryItems');
