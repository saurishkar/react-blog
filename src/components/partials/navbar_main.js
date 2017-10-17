import { Navbar, Nav, NavItem } from 'react-bootstrap';
import React, { Component } from 'react';
import NavbarSub from './navbar_sub';
import { Link } from 'react-router-dom';


import Auth from '../admin/auth';

class NavbarMain extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showModal: false,
			isLoggedIn: false
		};
		this.openModal = this.openModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.logoutUser = this.logoutUser.bind(this);
	}

	openModal() {
		this.setState({
			showModal: true
		});
	}

	closeModal() {
		this.setState({
			showModal: false
		});
	}

	logoutUser() {
		localStorage.clear();
		this.setState({ isLoggedIn: false });
	}

	loginUser() {
		this.setState({
			isLoggedIn: true
		});
		this.openModal();
	}

	render() {

		const renderUserSession = () => {
			const user = localStorage.getItem('loggedInUser');
			if(user) {
				return (
					<div className="row">
						<div className="col-sm-8">
							<a href="#">{user.email}</a>
						</div>
						<div className="col-sm-4">
							<a tabIndex="0" role="button"  onClick={() => this.logoutUser()}>Logout</a>
						</div>
					</div>

				);
			}

			return (
				<div tabIndex="0" role="button" onClick={() => this.loginUser()} style={{ color: '#aaa'}}>Login</div>
			);
		};
		return (
			<div>
				<Navbar fixedTop={false}>
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
				<Auth 
					showModal={this.state.showModal}
					closeModal={this.closeModal}
				/>
			</div>
		);
	}
}

export default NavbarMain;
