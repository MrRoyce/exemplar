'use strict';

const dispatcher = require('./../dispatcher.js')

class GroceryItemActionCreator {

	// Add an item to the store
	add(item) {
		dispatcher.dispatch({
			payload: item,
			type: 'grocery-item:add'			
		})

	}

	delete(item) {
		dispatcher.dispatch({
			payload: item,
			type: 'grocery-item:delete'			
		})

	}

	buy(item) {
		dispatcher.dispatch({
			payload: item,
			type: 'grocery-item:buy'			
		})

	}

	unbuy(item) {
		dispatcher.dispatch({
			payload: item,
			type: 'grocery-item:unbuy'			
		})

	}


}

module.exports = GroceryItemActionCreator;