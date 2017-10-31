import React, { Component } from 'react';
import { Redirect, Route } from 'react-router-dom';

const Auth = (WrappedComponent) => {
	class AuthCheck extends Component {
		render() {
			const renderContent = localStorage.getItem('loggedInUser') ?
				(
					<WrappedComponent {...this.props}/>
				) :
				(
					<div> You need to be logged in to see this page </div>);

			return <div>{renderContent}</div>;
		}
	}
	return AuthCheck;
};

export default Auth;