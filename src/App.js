import React from 'react';
import ReactFire from 'reactfire';
import Firebase from 'firebase';
import _ from 'lodash';


import Header from './header.js';
import List from './list';

const rootUrl = 'https://brilliant-inferno-1304.firebaseio.com/';



var App = React.createClass({
  
	mixins: [ReactFire],

	getInitialState: function() {
		return {
			items: {},
			loaded: false
		};
	},

	componentWillMount: function() {
		this.fb = new Firebase(rootUrl + 'items/');
		this.bindAsArray(this.fb, 'items');

		this.fb.on('value', this.handleOnLoaded);
	},

	render: function (){
		return (
		  	<div className="row panel panel-default">
		  		<div className="col-md-8 col-md-offset-2">
		  			<h2 className="text-center">
		  				To-Do List
		  			</h2>
		  			<Header itemsStore={this.firebaseRefs.items} />
		  			<hr />
		  			<div className={'content ' + (this.state.loaded ? 'loaded' : '')}>
			  			<List items={this.state.items} /> 
			  			{this.deleteAllDonesButton()}	
		  			</div>
		  		</div>
		  	</div>
		);
	},

	deleteAllDonesButton: function() {
		if (!this.state.loaded) {
			return;
		}
		else {
			return (
				<div className="text-center clear-complete">
					<hr />
					<button 
						type="button"
						className="btn btn-default"
						onClick={this.onDeleteAllDoneClick}
						>
						Clear Complete
					</button>
				</div>
			);
		}
	},

	onDeleteAllDoneClick: function() {
		var list = _.chain(this.state.items)
					    .filter({ done: false })
					    .map(_.partialRight(_.pick, 'done', 'text'))
					    .value();


		this.fb.set(list);
	},	

	handleOnLoaded: function(snap) {
		this.setState({loaded: true});
	}
});

module.exports = App;
