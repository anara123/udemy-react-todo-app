import React from 'react';

const rootUrl = 'https://brilliant-inferno-1304.firebaseio.com/';

var ListItem = React.createClass({

	getInitialState: function() {
		return {
			text: this.props.item.text,
			done: this.props.item.done,
			textEdited: false
		};
	},

	componentWillMount: function() {
		this.fb = new Firebase(rootUrl + 'items/' + this.props.item['.key']);
	},

	render: function() {
		return (
			<div className="input-group">
				<span className="input-group-addon">
					<input 
						checked={this.state.done}
						type="checkbox" 
						onChange={this.handleDoneChange}/>
				</span>
				<input 
					disabled={this.state.done}
					type="text" 
					className="form-control" 
					value={this.state.text}
					onChange={this.handleTextChange}>
				</input>
				<span className="input-group-btn">
					{this.changeButtons()}
					<button 
						className="btn btn-default"
						onClick={this.handleDeleteClick}
						> 
						Delete
					</button>
				</span>
			</div>
		);
	},

	changeButtons: function() {
		if (!this.state.textEdited) {
			return null;
		}
		else {
			return [
				<button 
					className="btn btn-default" 
					onClick={this.handleSaveClick}
					>
					Save
				</button>,
				<button 
					className="btn btn-default" 
					onClick={this.handleUndoClick}
					>
					Undo
				</button>
			];
		}
	},

	handleDeleteClick: function() {
		this.fb.remove();
	},

	handleUndoClick: function() {
		this.setState({
			text: this.props.item.text,
			textEdited: false 
		});
	},

	handleSaveClick: function() {

		this.setState({ textEdited: false });
		this.fb.update({ text: this.state.text });
	},

	handleTextChange: function(event) {
		this.setState({
			text: event.target.value,
			textEdited: true
		});
	},

	handleDoneChange: function(event) {
		const update = { done: event.target.checked };
		
		this.setState(update);
		this.fb.update(update);
	}
});

module.exports = ListItem;
