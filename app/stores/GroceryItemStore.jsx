'use strict';

const dispatcher = require('./../dispatcher.js'),
      helper     = require('./../helpers/RestHelper.js')

function GroceryItemStore() {

	let	items     = [],
	    listeners = [],
	    itemIndex,

	    getItems  = () => {
	    	return items;
	    },

	    addGroceryItem = (item) => {
	    	items.push(item);
	 		itemIndex = items.indexOf(item);
	        triggerListeners();
	        helper.post('api/items', item)
	        .then((newItem, error) => {
	            items.splice(itemIndex, 1);
	            items.push(newItem);
	            triggerListeners();
	        });
	    },

	    deleteGroceryItem = (item) => {
	        var index;
	        items.filter((_item, _index) => {
	            if (_item.name == item.name) {
	                index = _index;
	            }
	        });

	        items.splice(index,1);
	        triggerListeners();

	        helper.del('api/items/' + item._id);
	    },

	    setGroceryItemBought = (item, isBought) => {
	        var _item = items.filter((a) =>
	        	{ return a.name == item.name}
	        	)[0];
	        item.purchased = isBought || false;
	        triggerListeners();

	        helper.patch('api/items/' + item._id, item);
		 },

		 onChange = (listener) => {
		 	listeners.push(listener);
		 },

		 triggerListeners = () => {
		 	listeners.forEach( (listener) => {
		 		listener(items);
		 	})
		 }
	;


	 helper.get('api/items')
	 .then((data) => {
	 	items = data;
	 	triggerListeners();
	 })


	 dispatcher.register((event) => {

	 	var split = event.type.split(':');

	 	if (split[0] === 'grocery-item') {
	 		switch(split[1]) {
	 			case 'add':
	 				addGroceryItem(event.payload);
	 				break;

	 			case 'delete':
	 				deleteGroceryItem(event.payload);
	 				break;

	 			case 'buy':
	 				setGroceryItemBought(event.payload, true);
	 				break;

	 			case 'unbuy':
	 				setGroceryItemBought(event.payload, false);
	 				break;
	 		}
	 	}
	 })

	 return {
	 	getItems: getItems,
	 	onChange: onChange
	 }


}

module.exports = new GroceryItemStore();
