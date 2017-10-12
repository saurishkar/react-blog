import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {UpdatePost} from '../../actions/posts';

class EditModal extends Component {
	constructor(props) {
		super(props);
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
		values.last_updated = new Date().toLocaleString();
		this.props.UpdatePost(this.props.index, values);
		this.props.closeEditModal();
		this.props.reset();
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.showEditModal === true && nextProps.showEditModal != this.props.showEditModal)
		{
			this.props.initialize(this.props.posts[nextProps.index]);
		}
	}

	render() {
		const { handleSubmit } = this.props;
		// console.log('Receiving', this.props.post);
		return (
			<div>
				<Modal show={this.props.showEditModal} onHide={() => this.props.closeEditModal()}>
					<Modal.Header closeButton>
						<h4 className="text-center">Edit Post</h4>
					</Modal.Header>
					<Modal.Body>
						<form className="form-group" onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
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
							<br />
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
	// console.log(values);
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
	return state.posts;
}

function mapDispatchToProps(dispatch) {
	// console.log('mapDispatchToProps');
	return bindActionCreators({UpdatePost}, dispatch);
}

export default reduxForm({
	validate: validate,
	form: 'updatePostForm' 
})(
	connect(mapStateToProps, mapDispatchToProps)(EditModal));
