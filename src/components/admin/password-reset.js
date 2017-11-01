import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Button } from 'react-bootstrap';

import MESSAGES from '../../constants/validation-messages';

class PasswordReset extends Component {
	
	constructor(props) {
		super(props);

		this.handleFormSubmit = this.handleFormSubmit.bind(this);
	}

	renderField(field) {
		return (
			<div>
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

	handleFormSubmit(formData) {
		console.log(formData);
		// Call the relevant dispatch action here after checking for initial conditions.
		// this.props.ChangePassword(formData.password).
	}

	render() {
		const { handleSubmit } = this.props;
		return (
			<div className="password-reset panel">
				<form className="form-group password-reset-form" onSubmit={handleSubmit(this.handleFormSubmit)}>
					<h4 className="text-center"> Password Reset </h4><br />
					<div className="row">
						<div className="col-sm-12">
							<Field 
								label="Password"
								placeholder="New Password"
								type="password"
								component={this.renderField}
								name="password"
							/>
						</div>
						<div className="col-sm-12">
							<Field 
								label="Password Confirmation"
								placeholder="Confirm New Password"
								type="password"
								component={this.renderField}
								name="password_confirm"
							/>
						</div>
					</div>	
					<br />
					<div className="text-center ">
						<Button className='form-control btn btn-primary' type="submit">Change</Button>
					</div>	
				</form>
			</div>
		);
	}
}

function validate(values) {
	const errors = {};
	if(!values.password) {
		errors.password = MESSAGES.user.password;
	}
	if(!values.password_confirm) {
		errors.password_confirm = MESSAGES.user.password;
	}

	return errors;
}

export default reduxForm({
	validate: validate,
	form: 'passwordReset'
})(
	PasswordReset );
