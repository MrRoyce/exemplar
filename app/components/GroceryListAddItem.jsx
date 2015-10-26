'use strict';

// Modules
const React         = require('react');

// Files
const Utility       = require('./../utility.js'),
      actionCreator = require('./../actions/GroceryItemActionCreator.jsx');

let myActionCreator = new actionCreator();

class GroceryListAddItem extends React.Component{

	constructor () {
		super();
		Utility.bind(this, ['handleInputName', 'addItem']);
		this.state = {input : ''}; //this.getFirstState();
	}

	handleInputName (e) {
		this.setState({input : e.target.value});
	}

	addItem (e) {
		// Create a new instance of the class

		e.preventDefault();
		//console.log('Adding Item: ', this.state.input);
        myActionCreator.add({
          name : this.state.input
        });

        this.setState({
          input : ''
        });
	}

	render () {
		return (
			<div className='grocery-addItem'>
				<form onSubmit={this.addItem} >
					<input value={this.state.input} onChange={this.handleInputName} />
					<button> Add Item </button>
				</form>
			</div>
		);
	}
}

module.exports = GroceryListAddItem;
