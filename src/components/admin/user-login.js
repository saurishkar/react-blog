import React, {Component} from 'react';
import { instanceOf } from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { Modal } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { TextField } from 'redux-form-material-ui';
import {Button} from 'material-ui';

import { Login } from '../../actions/auth';
import UserAPI from '../../apis/auth';
import { FetchUserPosts } from '../../actions/posts';
import MESSAGES from '../../constants/validation-messages';

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
									<Field 
										label="Email" 
										name="email" 
										fullWidth={true} 
										type="email" 
										component={TextField} />
								</div>
								<br />
								<div>
									<Field 
										label="Password" 
										name="password" 
										fullWidth={true} 
										type="password" 
										component={TextField} />
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
	const errors = {};
	console.log('values', values);
	if(!values.email) {
		errors.email = MESSAGES.user.email;
	}

	if(!values.password) {
		errors.password = MESSAGES.user.password;
	}

	return errors;
}

export default reduxForm({
	validate: validate,
	form: 'loginUserForm'
})(UserLogin);
