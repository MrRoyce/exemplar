'use strict';

// Core
const React             = require('react'),
      ReactDOM          = require('react-dom');

// Files
const GroceryItemList   = require('./components/GroceryItemList.jsx'),
      groceryItemStore  = require('./stores/GroceryItemStore.jsx');

var initialData = groceryItemStore.getItems();

// Tell react to render the top level component
function render () {
	ReactDOM.render(<GroceryItemList items={initialData}/>, app);
}

groceryItemStore.onChange(function (items) {
	initialData = items;
	render();
});

render();  // Away we go!
