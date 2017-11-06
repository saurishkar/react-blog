import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { Button } from 'material-ui';
import { TextField } from 'redux-form-material-ui';

import UserAPI from '../../apis/auth';
import { Login } from '../../actions/auth';
import MESSAGES from '../../constants/validation-messages';

class UserSignup extends Component {
	constructor(props) {
		super(props);
	}

	handleFormSubmit(formData) {
		const promise = this.props.Signup(formData);
		promise.then((response) => {
			if(response.uid) {
				this.props.closeModal();
				this.props.reset();
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
											component={TextField}
											name="email"
											label="Email Address"
											fullWidth={true}
										/>
									</div>
								</div>
								<br />
								<div className="row">
									<div className="col-sm-6">
										<Field 
											type="password"
											component={TextField}
											name="password"
											label="Password"
											fullWidth={true}
										/>
									</div>
									<div className="col-sm-6">
										<Field 
											type="password"
											component={TextField}
											name="password_confirm"
											label="Password Confirmation"
											fullWidth={true}
										/>
									</div>
								</div>
								<br />
							</Modal.Body>
							<Modal.Footer>
								<Button raised color="primary" type="submit">Register</Button>
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
		errors.email = MESSAGES.user.email;
		
	if (!values.password)
		errors.password = MESSAGES.user.password;
		
	if (!values.password_confirm)
		errors.password_confirm = MESSAGES.user.password;
	
	return errors;
}

export default reduxForm({
	validate: validate,
	form: 'UserSignupForm'
})(UserSignup);
