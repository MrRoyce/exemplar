'use strict';

// Modules
const React         = require('react');

// Files
const Utility       = require('./../utility.js'),
      actionCreator = require('./../actions/GroceryItemActionCreator.jsx');

let myActionCreator = new actionCreator();

class GroceryItem extends React.Component{

	constructor () {
		super();
		Utility.bind(this, ['delete', 'togglePurchase']);
	}

	togglePurchase (e) {
		e.preventDefault();

		if (this.props.item.purchased) {
			myActionCreator.unbuy(this.props.item);
		} else {
			myActionCreator.buy(this.props.item);
		}
	}

	delete (e) {
		e.preventDefault();
		myActionCreator.delete(this.props.item);

	}

	render () {
		return (
			<div className='grocery-item row'>
				<div className='six columns'>
					<h4 className={this.props.item.purchased ? 'strikethrough' : ''}>{this.props.item.name}</h4>
				</div>
				<form className='three columns' onSubmit={this.togglePurchase}>
					<button className={this.props.item.purchased ? '' : 'button-primary'} >{this.props.item.purchased ? 'Unbuy' : 'Buy'}</button>
				</form>
				<form className='three columns' onSubmit={this.delete}>
					<button>&times;</button>
				</form>
			</div>
		);
	}
}

module.exports = GroceryItem;
