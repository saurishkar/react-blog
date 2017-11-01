import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
	return (
		<div className="not-found">
			<h4>A 404 !</h4>
			<small>Visit <Link to="/home"><u>Home</u></Link> page.</small> 
		</div>
	);
};

export default NotFound;