import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import { Collapse, Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Create from './create';
import {DeletePost, UpdatePost} from '../../actions/posts';
import DeleteModal  from '../partials/confirmation_modal';
import EditModal from './edit';

class Index extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isOpen: false,
			showDeleteModal: false,
			showEditModal: false,
			selectedPost: null

		};

		this.handleButtonClick = this.handleButtonClick.bind(this);
		this.closeDeleteModal = this.closeDeleteModal.bind(this);
		this.showDeleteModal = this.showDeleteModal.bind(this);
		this.deletePost = this.deletePost.bind(this);
		this.closeEditModal = this.closeEditModal.bind(this);
	}

	handleButtonClick() {
		this.setState({
			isOpen: !this.state.isOpen
		});
	}

	closeEditModal() {
		this.setState({
			showEditModal: false,
			selectedPost: null
		});
	}

	closeDeleteModal() {
		this.setState({
			showDeleteModal: false,
			selectedPost: null
		});
	}

	showDeleteModal(index) {
		this.setState({
			showDeleteModal: true,
			selectedPost: index
		});
	}

	showEditModal(index) {
		this.setState({
			showEditModal: true,
			selectedPost: index
		});
	}

	deletePost() {
		// console.log(this.props);
		this.props.DeletePost(this.state.selectedPost);
		this.setState({
			selectedPost: null,
			showDeleteModal: false
		});
	}

	render() {
		const renderPosts = this.props.posts.map((elem, index) => {
			return (
				<tr key={index}>
					<td>{index+1}</td>
					<td>{elem.title}</td>
					<td>{elem.content}</td>
					<td>{new Date(Date.now()).toLocaleString()}</td>
					<td>
						<div className="btn-group">
							<div className="btn btn-warning btn-sm" onClick={() => this.showEditModal(index)}>Edit</div>
							<div className="btn btn-danger btn-sm" onClick={()=>this.showDeleteModal(index)}>Delete</div>
							<div className="btn btn-info btn-sm">View</div>
						</div>
					</td>
				</tr>
			);
		});
		// console.log('Fetch',this.props.posts[this.state.selectedPost]);
		return (
			<div>
				<button className="btn btn-info align-right" onClick={this.handleButtonClick}>Create a New Post</button>
				<Collapse in={this.state.isOpen}>
					<div>
						<Create onButtonClick = {() => this.setState({ isOpen: !this.state.isOpen })} />
					</div>
				</Collapse><br />
				{this.props.posts.length > 0 ?
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
					: <h4 className="text-center">No Data Available</h4>
				}

				<DeleteModal 
					showDeleteModal={this.state.showDeleteModal}
					closeDeleteModal={this.closeDeleteModal}
					deletePost = {this.deletePost}
				/>
				<EditModal
					showEditModal={this.state.showEditModal}
					index = {this.state.selectedPost}
					closeEditModal = {this.closeEditModal}
				/>
			</div>
		);
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ DeletePost, UpdatePost }, dispatch);
}

function mapStateToProps(state) {
	return state.posts;
}

export default connect(mapStateToProps, mapDispatchToProps)(Index);