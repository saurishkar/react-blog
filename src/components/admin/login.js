import React, {Component} from 'react';
import { reduxForm, Field } from 'redux-form';
import { Button, Modal } from 'react-bootstrap';

class Login extends React.Component {
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
		// console.log('Modal', this.props.showModal);
		return (
			<Modal show={this.props.showModal} onHide={()=>this.props.closeModal()}>
				<Modal.Header closeButton>
					<h4>Login</h4>
				</Modal.Header>
				<Modal.Body>
					<form className="form-group login-form">
						<Field 
							label="Email"
							name="email"
							type="email"
							placeholder="Please enter your email"
							component={this.renderField}
						/>
						<Field 
							label="Password"
							name="password"
							type="password"
							placeholder="Please enter your password"
							component={this.renderField}
						/>
						<br />
						<Button className="btn btn-success btn-sm form-control" type="submit">Login</Button>
					</form>
				</Modal.Body>
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

export default reduxForm({
	validate: validate,
	form: 'loginAdminForm'
})(Login);