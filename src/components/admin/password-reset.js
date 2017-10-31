import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Button } from 'react-bootstrap';

class PasswordReset extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="password-reset panel">
				<form className="form-group password-reset-form">
					<h4 className="text-center"> Password Reset </h4>
					<div className="row text-center">
						<div className="col-sm-12">
							<Field 
								label="Password"
								placeholder="Password"
								type="password"
								component="input"
								className="form-control"
								name="password"
							/>
						</div>
						<div className="col-sm-12">
							<Field 
								label="Password Confirmation"
								placeholder="Confirm Password"
								type="password"
								component="input"
								className="form-control"
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

export default reduxForm({
	form: 'passwordReset'
})(
	PasswordReset );