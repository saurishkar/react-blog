import { Navbar, Nav, NavItem } from 'react-bootstrap';
import React, { Component } from 'react';
import NavbarSub from './navbar_sub';
import { Link } from 'react-router-dom';
import { withCookies, Cookies } from 'react-cookie';

class NavbarMain extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoggedIn: false
		};

		this.logoutUser = this.logoutUser.bind(this);
	}

	logoutUser() {
		this.props.cookies.remove('loggedInUser');
		this.setState({ isLoggedIn: false });
	}

	loginUser() {
		this.setState({
			isLoggedIn: true
		});
		this.props.showLoginModal();
	}

	render() {

		const renderUserSession = () => {
			const user = this.props.cookies.get('loggedInUser');
			if(user) {
				return (
					<div className="row">
						<div className="col-sm-8">
							<a href="#">{user.email}</a>
						</div>
						<div className="col-sm-4">
							<a href="#" onClick={() => this.logoutUser()}>Logout</a>
						</div>
					</div>

				);
			}

			return (
				<a href="#" onClick={() => this.loginUser()}>Login</a>
			);
		};
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
					<li className="nav-item align-right">{renderUserSession()}</li>
				</ul>
			</Navbar>
		);
	}
}

export default withCookies(NavbarMain);