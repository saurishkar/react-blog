import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import { reduxForm, Field } from 'redux-form';
import { TextField } from 'redux-form-material-ui';
import { Button } from 'material-ui';

import MESSAGES from '../../constants/validation-messages';

class PasswordForgot extends Component{
	
	constructor(props) {
		super(props);

		this.handleFormSubmit = this.handleFormSubmit.bind(this);
	}

	handleFormSubmit(formData) {
		const promise = this.props.ForgotPassword(formData);
		promise.then((response) => {
			this.props.reset();
			this.props.closeModal();
		});
	}

	render() {
		const { handleSubmit } = this.props;

		return (
			<div>
				<Modal show={this.props.openModal} onHide={() => this.props.closeModal()}>
					<form className="forgot-password" onSubmit={handleSubmit(this.handleFormSubmit)}>
						<Modal.Header closeButton>
							<h4 className="text-center">Forgot Password ? </h4>
						</Modal.Header>
						<Modal.Body>
							<Field	
								type="email"
								placeholder="Email Address"
								component={TextField}
								name="email"
								label="Email Address"
								fullWidth={true}
							/>
						</Modal.Body>
						<Modal.Footer>
							<a 
								role="button"
								tabIndex="0"
								className="btn btn-light"
								onClick={() => this.props.showLoginModal()}
										
							>Back To Login
							</a>
							<Button 
								type="submit" 
								raised
								color="primary"
							>Send Password Reset Link
							</Button>
						</Modal.Footer>
					</form>
				</Modal>
			</div>
		);
	}
}

function validate(values) {
	const errors = {};

	if(!values.email) {
		errors.email = MESSAGES.user.email;
	}
	return errors;
}

export default reduxForm({
	form: 'ForgotPassword',
	validate: validate
})(PasswordForgot);
