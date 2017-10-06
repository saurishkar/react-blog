import { Navbar, Nav, NavItem } from 'react-bootstrap';
import React, { Component } from 'react';
import NavbarSub from './navbar_sub';
import { Link } from 'react-router-dom';

class NavbarMain extends React.Component {

	render() {
		return (
			<Navbar>
				<Navbar.Header>
					<Navbar.Brand>
						<a href="#">Learn To React</a>
					</Navbar.Brand>
				</Navbar.Header>
				<ul className="list-unstyled navbar-nav">
					<li className="nav-item"><Link to="/">Home</Link></li>
					<li className="nav-item"><Link to="/about">About</Link></li>
					<li className="nav-item"><Link to="/blog">Blog Post</Link></li>
					<li className="nav-item align-right"><a onClick={()=>this.props.showLoginModal()}>Login</a></li>
				</ul>
			</Navbar>
		);
	}
}

export default NavbarMain;