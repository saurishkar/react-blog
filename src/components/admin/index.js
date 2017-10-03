import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Index extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<p>Welcome to admin index page</p>
				<Link to="/create">Create</Link>
				{this.props.children}
			</div>
		);
	}
}

export default Index;