import React from 'react';

import ListItem from './list-item';

var List = React.createClass({

	render: function() {

		return (

			<div>
				{this.renderTodos()}
			</div>
		);
	},

	renderTodos: function() {

		if (this.props.items && Object.keys(this.props.items).length === 0) {

			return <h4>Push add button to add new todo</h4>;
		}
		else {

			return this.props.items.map((item) => {

				return <ListItem key={item['.key']} item={item} />;
			});
		}
	}
});

module.exports = List;