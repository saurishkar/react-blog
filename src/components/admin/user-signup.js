import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';

import messages from '../../constants/validation-messages';

class UserSignup extends Component {
	constructor(props) {
		super(props);
	}

	renderField(field) {
		return (
			<div>
				<div className="form-input">
					<label>{field.label}</label>
					<input 
						type={field.type}
						name={field.name}
						placeholder={field.placeholder}
						className={`form-control ${field.meta.touched && field.meta.error ? 'error' : ''}`}
						{...field.input}
					/>
					<span className="text-danger"><small>{field.meta.touched && field.meta.error}</small></span><br />
				</div>
			</div>
		);
	}

	handleFormSubmit(formData) {
		const promise = this.props.Signup(formData);
		promise.then((response) => {
			if(response.uid) {
				this.props.Login(formData);
			}
		});
	}

	render() {
		const { handleSubmit } = this.props;
		return (
			<div>
				<Modal show={this.props.showModal} onHide={() => this.props.closeModal()}>
					<div>
						<form className="form" onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
							<Modal.Header closeButton>
								<h4 className="text-center">Sign Up</h4>
							</Modal.Header>
							<Modal.Body>
								<div className="row">
									<div className="col-sm-12">
										<Field 
											type="email"
											component={this.renderField}
											name="email"
											placeholder="Email Address"
											label="Email"
										/>
									</div>
									<div className="col-sm-6">
										<Field 
											type="password"
											component={this.renderField}
											name="password"
											placeholder="Password"
											label="Password"
										/>
									</div>
									<div className="col-sm-6">
										<Field 
											type="password"
											component={this.renderField}
											name="password_confirm"
											placeholder="Password Confirmation"
											label="Password Confirmation"
										/>
									</div>
								</div>
							</Modal.Body>
							<Modal.Footer>
								<div className="btn-group text-center">
									<button className="btn btn-primary" type="submit">Register</button>
									<div className="btn btn-danger" onClick={() => this.props.closeModal()}>Cancel</div>
								</div>
							</Modal.Footer>
						</form>
					</div>
				</Modal>
			</div>
		);
	}
}

function validate(values) {
	const errors = {};
		
	if (!values.email)
		errors.email = messages.user.email;
		
	if (!values.password)
		errors.password = messages.user.password;
		
	if (!values.password_confirm)
		errors.password_confirm = messages.user.password;
	
	if( values.password != values.pasword_confirm) {
		errors.password = messages.user.password_match;
		errors.password_confirm = messages.user.password_match;
	}
	return errors;
}

function mapDispatchToProps(dispatch) {
	return {
		Signup: (formData) => {
			const userSignupPromise = UserAPI.signup(formData);
			return userSignupPromise;
			// const userLoginPromise = UserAPI.login(formData);
			// userLoginPromise.then((response) => {
			// 	if(response.uid) {
			// 		localStorage.setItem('loggedInUser', JSON.stringify({user: {email: response.email, uid: response.uid}}));
			// 		dispatch(Login());
			// 	}
			// });
			
			// return userLoginPromise;
		},
		// initializeUser: () => {
		// 	dispatch(Login());
		// 	dispatch(FetchUserPosts());
		// }
	};
}

export default reduxForm({
	validate: validate,
	form: 'UserSignupForm'
})(
	connect(null, mapDispatchToProps)(UserSignup));