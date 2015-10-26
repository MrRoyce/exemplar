'use strict';

const React              = require('react'),
      GroceryItem        = require('./GroceryItem.jsx'),
      GroceryListAddItem = require('./GroceryListAddItem.jsx')


class GroceryItemList extends React.Component{
	
	constructor() {
		super();
	}
 
	render() {
		return (
			<div>
				<h1>Grocery Listify</h1>
				<div>
				   <ul>
                     {
                     	this.props.items.map((item, index) => {
                     		return (
                     			<GroceryItem item={item} key={'item' + index}/>
                     		)
                     	})
                     }
				   </ul>
				</div>
				<GroceryListAddItem />
			</div>
		)
	}
}

module.exports = GroceryItemList;