import React, { Component } from 'react';
import { Modal, Checkbox, FormGroup } from 'react-bootstrap';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';

import {UpdatePost, FetchUserPosts} from '../../actions/posts';
import Tags from './tags';

class EditModal extends Component {
	constructor(props) {
		super(props);
		this.state={
			selectedTags: {}
		};
		this.handleCheckTag = this.handleCheckTag.bind(this);
	}

	handleCheckTag(event, element) {
		if (event.target.checked) {
			if (!this.state.selectedTags[element[0]]) {
				this.setState({
					selectedTags: Object.assign(this.state.selectedTags, {[element[0]]: element[1]})
				});
			}
		} else {
			this.setState({
				selectedTags: _.omit(this.state.selectedTags, element[0])
			});
		}
	}

	renderInput(field) {
		return (
			<div>
				<label htmlFor={field.label}>{field.label}</label>
				<input 
					className={`form-control ${ field.meta.error && field.meta.touched ? 'error':''}`} 
					type="text" 
					placeholder={field.placeholder}
					{...field.input}
				/>
				<span className="text-danger">{field.meta.touched && field.meta.error}</span>
			</div>
		);
	}

	renderTextarea(field) {
		return (
			<div>
				<label htmlFor={field.label}>{field.label}</label>
				<textarea 
					className={`form-control content ${ field.meta.error && field.meta.touched? 'error':''}`} 
					type="text" 
					placeholder={field.placeholder}
					{...field.input}
				/>
				<span className="text-danger">{field.meta.touched && field.meta.error}</span>
			</div>
		);
	}

	handleFormSubmit(values){
		console.log('Updated Values', values);
		const currentUser = this.props.auth.user;
		values.author_email = currentUser.email;
		values.last_updated = new Date().toLocaleString();
		values.tags = this.state.selectedTags;
		const promise = this.props.UpdatePost(this.props.index, values);
		promise.then(() => {
			this.props.FetchUserPosts();
		});
		this.props.closeEditModal();
		this.props.reset();
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.showEditModal === true && nextProps.showEditModal != this.props.showEditModal)
		{
			const userPost = this.props.posts;
			const post = userPost.filter((elem) => {
				if (elem[0] == nextProps.index)
					return true;
			});
			const initialValues = {title: post[0][1].title, content: post[0][1].content};
			Object.assign(initialValues, {tags: post[0][1].tags});
			this.setState({
				selectedTags: Object.assign({}, post[0][1].tags)
			});
			this.props.initialize(initialValues);
		}
	}

	render() {
		const { handleSubmit } = this.props;
		return (
			<div>
				<Modal bsSize="lg" show={this.props.showEditModal} onHide={() => this.props.closeEditModal()}>
					<Modal.Header closeButton>
						<h4 className="text-center">Edit Post</h4>
					</Modal.Header>
					<Modal.Body>
						<form className="form-group" onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
							<div className="row">
								<div className="col-sm-12">
									<Field 
										label="Post Title"
										placeholder="Post Title"
										name="title"
										component={this.renderInput}
									/><br />
									<Field
										label="Post Content"
										placeholder="Post Content"
										name="content"
										component={this.renderTextarea}
									/>
								</div>
							</div><br />
							<div className="row">
								<div className="col-sm-12">
									<Tags
										handleChange = {this.handleCheckTag}
									/>
								</div>
							</div><br />
							<div className="btn-group">
								<button className="btn btn-success" type="submit">Update</button>
								<a className="btn btn-default" onClick={() => this.props.closeEditModal()}>Cancel</a>
							</div>
						</form>
					</Modal.Body>
				</Modal>
			</div>
		);
	}
}
function validate(values) {
	const errors ={} ; // redux-form will check for this object for any added properties and return them
	// as errors if present on submission of the form
    
	if (!values.title) {
		errors.title = 'Title is Required';
	}

	if (!values.content) {
		errors.content = 'Post Content is Required';
	}

	return errors;
}

function mapStateToProps(state) {
	return {posts: state.posts, auth: state.auth, tags: state.tags, userPosts: state.userPosts};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({UpdatePost, FetchUserPosts}, dispatch);
}

export default reduxForm({
	validate: validate,
	form: 'updatePostForm' 
})(
	connect(mapStateToProps, mapDispatchToProps)(EditModal));
