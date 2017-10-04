import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import { Collapse } from 'react-bootstrap';
import { connect } from 'react-redux';

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
		// console.log(this.props);
		const renderPosts = this.props.posts.map((elem, index) => {
			return (
				<tr key={index}>
					<td>{index+1}</td>
					<td>{elem.title}</td>
					<td>{elem.content}</td>
					<td>{new Date(Date.now()).toLocaleString()}</td>
					<td>
						<div className="btn-group">
							<div className="btn btn-warning btn-sm">Edit</div>
							<div className="btn btn-danger btn-sm">Delete</div>
						</div>
					</td>
				</tr>
			);
		});
		return (
			<div>
				<button className="btn btn-info align-right" onClick={this.handleButtonClick}>Create a New Post</button>
				<Collapse in={this.state.isOpen}>
					<div>
						<Create onButtonClick = {() => this.setState({ isOpen: !this.state.isOpen })} />
					</div>
				</Collapse>
				{this.props.posts.length > 0 &&
					<table>
						<thead>
							<tr>
								<th>#</th>
								<th>Post Title</th>
								<th>Post Content</th>
								<th>Last Updated</th>
							</tr>
						</thead>
						<tbody>
							{renderPosts}
						</tbody>
					</table>
				}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return state.posts;
}

export default connect(mapStateToProps)(Index);