import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import { Collapse, Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';

import Create from './create';
import { DeletePost, FetchUserPosts } from '../../actions/posts';
import DeleteModal  from '../shared/confirmation_modal';
import EditModal from './edit';
import NavbarMain from '../shared/navbar_main';

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

	showDeleteModal(key) {
		this.setState({
			showDeleteModal: true,
			selectedPost: key
		});
	}

	showEditModal(key) {
		this.setState({
			showEditModal: true,
			selectedPost: key
		});
	}

	deletePost() {
		this.props.DeletePost(this.state.selectedPost);  // This will send the corresponding key of the post
		this.setState({
			selectedPost: null,
			showDeleteModal: false
		});
	}

	componentWillMount() {
		this.props.FetchUserPosts();
	}

	render() {
		const list = this.props.userPosts;
		console.log('list', list);
		const renderPosts = list.map((elem, index) => {
			return (
				<tr key={index}>
					<td width="5%">{index + 1}</td>
					<td width="20%">{elem[1].title}</td>
					<td width="40%">{elem[1].content}</td>
					<td width="15%">{elem[1].last_updated}</td>
					<td width="20%">
						<div className="btn-group">
							<div className="btn btn-warning btn-sm" onClick={() => this.showEditModal(elem[0])}>Edit</div>
							<div className="btn btn-danger btn-sm" onClick={()=>this.showDeleteModal(elem[0])}>Delete</div>
							<div className="btn btn-info btn-sm">View</div>
						</div>
					</td>
				</tr>
			);
		});
		// console.log('Fetch',this.props.userPosts[this.state.selectedPost]);
		return (
			<div>
				<div className="header-nav"><NavbarMain /></div>
				<div className="container">
					<button className="btn btn-info" onClick={this.handleButtonClick}>Create a New Post</button>
					<Collapse in={this.state.isOpen}>
						<div>
							<Create onButtonClick = {() => this.setState({ isOpen: !this.state.isOpen })} />
						</div>
					</Collapse><br />
					{list.length > 0 ?
						<table>
							<thead>
								<tr>
									<th width="5%">#</th>
									<th width="20%">Post Title</th>
									<th width="40%">Post Content</th>
									<th width="15%">Last Updated</th>
									<th width="20%"> </th>
								</tr>
							</thead>
							<tbody>
								{renderPosts}
							</tbody>
						</table>
						: <h4 className="text-center">{'No Data Available'}</h4>
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
			</div>
		);
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ DeletePost, FetchUserPosts }, dispatch);
}

function mapStateToProps({ userPosts }) {
	return { userPosts };
}

export default connect(mapStateToProps, mapDispatchToProps)(Index);
