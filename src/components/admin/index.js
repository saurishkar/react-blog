import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import { Collapse } from 'react-bootstrap';

import Create from './create';

class Index extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isOpen: false
		};

		this.handleButtonClick = this.handleButtonClick.bind(this);
	}

	handleButtonClick() {
		this.setState({
			isOpen: !this.state.isOpen
		});
	}

	render() {
		const url=`${this.props.match.url}/create`;
		return (
			<div>
				<button className="btn btn-info align-right" onClick={this.handleButtonClick}>Create a New Post</button>
				<Collapse in={this.state.isOpen}>
					<div>
						<Create onButtonClick = {() => this.setState({ isOpen: !this.state.isOpen })} />
					</div>
				</Collapse>	
			</div>
		);
	}
}

export default Index;