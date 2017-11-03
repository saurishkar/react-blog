import React, {Component} from 'react';
import { instanceOf } from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { Modal } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {Button, TextField, Input} from 'material-ui';

import { Login } from '../../actions/auth';
import UserAPI from '../../apis/auth';
import { FetchUserPosts } from '../../actions/posts';
import messages from '../../constants/validation-messages';

class UserLogin extends React.Component {

	constructor(props) {
		super(props);
		this.state ={
			showForgotPasswordModal: false
		};
		this.handleFormSubmit = this.handleFormSubmit.bind(this);
	}

	handleFormSubmit(formData) {
		this.props.Login(formData).then(() => {
			this.props.closeModal();
			this.props.reset(); // Resets the Login Form on successful login
		});
	}

	componentDidMount() {
		if (localStorage.getItem('loggedInUser')) {
			this.props.initializeUser();
		}
	}

	renderField(field) {

		return (
			<TextField 
				hintText={field.label}
				name={field.name}
				floatingLabelText={field.label}
				errorText={field.meta.touched && field.meta.error}
				type={field.type}
				fullWidth={true}
				{...field}
			/>
		);
	}

	render() {
		const { handleSubmit } = this.props;
		return (
			<div>
				<Modal show={this.props.showModal} onHide={()=>this.props.closeModal()}>
					<form onSubmit={handleSubmit(this.handleFormSubmit)}>
						<Modal.Header closeButton>
							<h4 className="text-center">Login</h4>
						</Modal.Header>
						<Modal.Body>
							<div className="login-form">
								<div>
									<Field label="Email" name="email" type="email" component={this.renderField} />
								</div>
								<br />
								<div>
									<Field label="Password" name="password" type="password" component={this.renderField} />
								</div>
								<br/>
							</div>
						</Modal.Body>
						<Modal.Footer>
							<a 
								tabIndex="0"
								role="button"
								className="btn btn-light"
								onClick = {() => this.props.showForgotPasswordModal()}
							>Forgot Password ?
							</a>
							<Button raised color="primary" type="submit">Login</Button><br />
						</Modal.Footer>
					</form>
				</Modal>
			</div>
		);
	}
}

function validate(values) {
	const errors = [];

	if(!values.email) {
		errors.email = messages.user.email;
	}

	if(!values.password) {
		errors.password = messages.user.password;
	}

	return errors;
}

export default reduxForm({
	validate: validate,
	form: 'loginUserForm'
})(UserLogin);
