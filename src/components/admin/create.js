import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';

import NavbarMain from '../partials/navbar_main';

class Create extends Component {
	constructor(props) {
		super(props);
	}

	renderInput(props) {
		return (
			<div>
				<label htmlFor={props.label}>{props.label}</label>
				<input className="form-control" type={props.type} placeholder={props.placeholder}/>
			</div>
		);
	}

	renderTextarea(props) {
		return (
			<div>
				<label htmlFor={props.label}>{props.label}</label>
				<textarea className="form-control content" type={props.type} placeholder={props.placeholder}/>
			</div>
		);
	}
	
	render() {
		const required = value => value? '': 'Required';
		const maxLength15 = value => value.length<=15 ? '':'Max Length is 15';
		const minLength5 = value => value.length>=5 ? '':'Min Length is 5';
		return (
			<div>
				<div className="container">
					<h2 className="text-center">Create a Blog Post</h2>
					<form className="form-group">
						<div className="row">
							<div className="col-sm-6">
								<Field 
									type="text"
									label="Post Title"
									component={this.renderInput}
									placeholder="Post Title"
									name="title"
								/>
								<Field
									type="text"
									label="Post Content"
									component={this.renderTextarea}
									placeholder="Post Content"
									name="content"
								/>
							</div>
						</div>

					</form>
				</div>
			</div>
		);
	}
}

export default reduxForm({
	form: 'postCreateForm'
})(Create);