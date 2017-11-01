import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { reduxForm, Field } from 'redux-form';

class PasswordForgot extends Component{
	
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<Modal show={this.props.openModal} onHide={() => this.props.closeModal()}>
					<form className="text-center forgot-password">
						<Modal.Header closeButton>
							<h4>Forgot Password ? </h4>
						</Modal.Header>
						<Modal.Body>
							<Field	
								type="email"
								placeholder="Email Address"
								component="input"
								className="form-control"
								name="email"
							/>
						</Modal.Body>
						<Modal.Footer>
							<div className="row text-center">
								<div className="col-sm-6 col-sm-offset-3">
									<Button className="btn btn-primary">Send Password Reset Link</Button><br />
								</div><br />
								<div className="col-sm-6 col-sm-offset-3">
									<a 
										onClick={() => this.props.showLoginModal()}
										role="button"
										tabIndex="0"
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