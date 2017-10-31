import React, { Component } from 'react';
import { Redirect, Route, Link } from 'react-router-dom';

const Auth = (WrappedComponent) => {
	
	// THIS IS A HIGHER ORDER COMPONENT THAT HANDLES PROTECTED PAGES FROM GAINING
	// UNAUTHORIZED ACCESS
	
	class AuthCheck extends Component {
		render() {
			const renderContent = localStorage.getItem('loggedInUser') ?
				(
					<WrappedComponent {...this.props}/>
				) :
				(
					<div> 
						<p>You need to be logged in to see this page.</p>
						<p>Click <Link to="/"><strong>Here</strong></Link> to go to main page.</p> 
					</div>);

			return <div>{renderContent}</div>;
		}
	}
	return AuthCheck;
};

export default Auth;