import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';


import Create from './create';

class Index extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const url=`${this.props.match.url}/create`;
		// console.log(url);
		return (
			<div>
				<h3>Hello</h3>
				<Link to={url} className="btn btn-info align-right">Create a New Post</Link>
				<Route path={url} component={Create} />	
			</div>
		);
	}
}

export default Index;