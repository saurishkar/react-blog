import React, {Component} from 'react';
import { instanceOf } from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { Button, Modal } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Login } from '../../actions/auth';
import UserAPI from '../../apis/auth';
import { FetchPosts } from '../../actions/posts';

class Auth extends React.Component {

	constructor(props) {
		super(props);

		this.handleFormSubmit = this.handleFormSubmit.bind(this);
	}

	handleFormSubmit(formData) {
		this.props.Login(formData);
		this.props.closeModal();
		this.props.reset(); // Resets the Login Form on successful login

	}

	componentDidMount() {
		const isUserLoggedIn = localStorage.getItem('loggedInUser');
		if (isUserLoggedIn && JSON.parse(isUserLoggedIn).user) {
			// Calling LOGIN action if localStorage contains user
			// After the page has been refreshed / reloaded
			// To protect the user data from getting lost.
			this.props.initializeUser();
		}
	}

	renderField(field) {

		return (
			<div>
				<label>{field.label}</label>
				<input {...field.input} 
					type={field.type} 
					name={field.name}
					placeholder={field.placeholder}
					className={`form-control ${ field.meta.error && field.meta.touched ? 'error':''}`}
				/>
				<span className="text-danger"><small>{field.meta.touched && field.meta.error}</small></span><br />
			</div>
		);
	}

	render() {
		// console.log('Modal', this.props.showModal);
		const { handleSubmit } = this.props;
		return (
			<Modal bsSize="sm" show={this.props.showModal} onHide={()=>this.props.closeModal()}>
				<form onSubmit={handleSubmit(this.handleFormSubmit)}>
					<Modal.Header closeButton>
						<h4 className="text-center">Login</h4>
					</Modal.Header>
					<Modal.Body>
						<div className="login-form">
							<Field 
								label="Email"
								name="email"
								type="email"
								placeholder="Email"
								component={this.renderField}
							/>
							<Field 
								label="Password"
								name="password"
								type="password"
								placeholder="Password"
								component={this.renderField}
							/>
						</div>
					</Modal.Body>
					<Modal.Footer>
						<Button className="btn btn-danger text-center form-control" type="submit">Login</Button>
					</Modal.Footer>
				</form>
			</Modal>
		);
	}
}

function validate(values) {
	const errors = [];

	if(!values.email) {
		errors.email = 'Email is Required';
	}

	if(!values.password) {
		errors.password = 'Password is Required';
	}

	return errors;
	
}

function mapStateToProps({auth}) {
	return {auth};
}

function mapDispatchToProps(dispatch) {
	return {
		Login: (formData) => {

			const userLoginPromise = UserAPI.login(formData);
			userLoginPromise.then((response) => {
				if(response.uid) {
					localStorage.setItem('loggedInUser', JSON.stringify({user: {email: response.email, uid: response.uid}}));
					dispatch(Login());
					// console.log(firebase.auth().currentUser);
					dispatch(FetchPosts());
				}
			});
			
			return userLoginPromise;
		},
		initializeUser: () => {
			dispatch(Login());
			dispatch(FetchPosts());
		}
	};
}

export default reduxForm({
	validate: validate,
	form: 'loginAdminForm'
})(connect(mapStateToProps, mapDispatchToProps)(Auth)
);
