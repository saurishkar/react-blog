import React, {Component} from 'react';
import { instanceOf } from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { Button, Modal } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

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
							<div className="row text-center">
								<div className="col-sm-12">
									<Button className="btn btn-primary form-control" type="submit">Login</Button>
								</div><br />
								<div className="col-sm-6 col-sm-offset-3">
									<a 
										tabIndex="0"
										role="button"
										className="btn btn-light"
										onClick = {() => this.props.showForgotPasswordModal()}
									>Forgot Password ?
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
