import React, {Component} from 'react';
import { reduxForm, Field } from 'redux-form';


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
					placeholder={field.placeholder}
					className={`form-control ${ field.meta.error && field.meta.touched ? 'error':''}`}
				/>
				<span className="text-danger">{field.meta.touched && field.meta.error}</span>
			</div>
		);
	}

	render() {
		return (
			<div>
				<form className="form-group">
					<Field 
						label="Email"
						type="email"
						placeholder="Please enter your email"
						component={this.renderField}
					/>
					<Field 
						label="Password"
						type="password"
						placeholder="Please enter your password"
						component={this.renderField}
					/>
				</form>
			</div>
		);
	}
}