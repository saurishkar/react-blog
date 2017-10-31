import React, { Component } from 'react';

const Auth = () => {
	const user = localStorage.getItem('loggedInUser');
	if(user && user.user) {
		return (
			// Return the required component to be rendered
			);

	}
	return (
			// Return or redirect back to home to login first
		);
};

export default Auth;