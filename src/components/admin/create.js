import React, { Component } from 'react';
import { reduxForm, Field} from 'redux-form';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { AddPost, FetchUserPosts } from '../../actions/posts';

class Create extends Component {
	constructor(props) {
		super(props);
	}

	renderInput(props) {
		return (
			<div>
				<label htmlFor={props.label}>{props.label}</label>
				<input className={`form-control ${ props.meta.error && props.meta.touched ? 'error':''}`} type="text" placeholder={props.placeholder} {...props.input}/>
				<span className="text-danger">{props.meta.touched && props.meta.error}</span>
			</div>
		);
	}

	renderTextarea(props) {
		return (
			<div>
				<label htmlFor={props.label}>{props.label}</label>
				<textarea className={`form-control content ${ props.meta.error && props.meta.touched? 'error':''}`} type="text" placeholder={props.placeholder} {...props.input}/>
				<span className="text-danger">{props.meta.touched && props.meta.error}</span>
			</div>
		);
	}

	handleFormSubmit(values){
		const currentUser = this.props.auth.user;
		values.last_updated = new Date().toLocaleString();
		values.author_email = currentUser.email;
		const AddPromise = this.props.AddPost(values);
		AddPromise.then(() => {
			this.props.FetchUserPosts();
		});
		this.props.reset();
		setTimeout(this.props.onButtonClick, 2000);
	}

	render() {
		const { handleSubmit } = this.props;
		return (
			<div className="container form">
				<form className="form-group" onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
					<div className="row">
						<div className="col-sm-6">
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
					<div className="btn-group">
						<button className="btn btn-danger" type="submit">Add</button>
						<a className="btn btn-default" onClick={this.props.onButtonClick}>Cancel</a>
					</div>
				</form>
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

function mapStateToProps({auth}) {
	return {auth};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({AddPost, FetchUserPosts}, dispatch);
}

export default reduxForm({
	validate: validate,
	form: 'postCreateForm'
})(
	connect(mapStateToProps, mapDispatchToProps)(Create));
