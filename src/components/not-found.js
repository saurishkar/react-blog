import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
	return (
		<div>
			<h4>Oops ! You discovered a 404, please click <Link to="/home"><strong>here</strong></Link> to go back to Home page.</h4> 
		</div>
	);
};

export default NotFound;