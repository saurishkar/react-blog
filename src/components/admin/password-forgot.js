import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { reduxForm, Field } from 'redux-form';

class PasswordForgot extends Component{
	
	constructor(props) {
		super(props);
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
		return (
			<div>
				<Modal show={this.props.openModal} onHide={() => this.props.closeModal()}>
					<form className="forgot-password">
						<Modal.Header closeButton>
							<h4 className="text-center">Forgot Password ? </h4>
						</Modal.Header>
						<Modal.Body>
							<Field	
								type="email"
								placeholder="Email Address"
								component={this.renderField}
								name="email"
								label="Email Address"
							/>
						</Modal.Body>
						<Modal.Footer>
							<div className="row text-center">
								<div className="col-sm-6 col-sm-offset-3">
									<Button className="btn btn-primary form-control">Send Password Reset Link</Button>
								</div>
								<div className="col-sm-6 col-sm-offset-3">
									<a 
										role="button"
										tabIndex="0"
										className="btn btn-light"
										onClick={() => this.props.showLoginModal()}
										
									>Back To Login
									</a>
								</div>
							</div>
						</Modal.Footer>
					</form>
				</Modal>
			</div>
		);
	}
}

export default reduxForm({
	form: 'ForgotPassword'
})(PasswordForgot);