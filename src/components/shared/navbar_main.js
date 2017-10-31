import { Navbar, Nav, NavItem } from 'react-bootstrap';
import React, { Component } from 'react';
import NavbarSub from './navbar_sub';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import UserLogin from '../admin/user-login';
import UserSignup from '../admin/user-signup';
import UserAPI from '../../apis/auth';
import { Logout } from '../../actions/auth';
import { FetchAllPosts, FetchUserPosts } from '../../actions/posts';
import Routes from '../../constants/routes';

class NavbarMain extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showLoginModal: false,
			showSignupModal: false
		};
		this.openLoginModal = this.openLoginModal.bind(this);
		this.closeLoginModal = this.closeLoginModal.bind(this);
		this.openSignupModal = this.openSignupModal.bind(this);
		this.closeSignupModal = this.closeSignupModal.bind(this);
	}

	openLoginModal() {
		this.setState({
			showLoginModal: true
		});
	}

	closeLoginModal() {
		this.setState({
			showLoginModal: false
		});
	}

	openSignupModal() {
		this.setState({
			showSignupModal: true
		});
	}

	closeSignupModal() {
		this.setState({
			showSignupModal: false
		});
	}

	render() {
		const renderUserSession = () => {
			if(this.props.auth && this.props.auth.user) {
				return (
					<ul className="list-unstyled navbar-nav">
						<li className="nav-item"><Link to={Routes.index}>My Posts</Link></li>
						<ul className="list-unstyled navbar-nav align-right">
							<li className="nav-item">{this.props.auth.user.email}</li>
							<li className="nav-item">
								<a 
									tabIndex="0"
									role="button" 
									onClick={() => this.props.Logout()}
								>Logout</a>
							</li>
						</ul>
					</ul>
				);
			}

			return (
				<ul className="align-right list-unstyled navbar-nav">
					<li
						tabIndex="0"
						role="button"
						onClick={() => this.openSignupModal()}
						style={{ color: '#aaa'}}
					>
					SignUp
					</li>

					<li 
						tabIndex="0" 
						role="button" 
						onClick={() => this.openLoginModal()} 
						style={{ color: '#aaa'}}
					>
					Login
					</li>
				</ul>
			);
		};
		return (
			<div>
				<Navbar fixedTop={false}>
					<Navbar.Header>
						<Navbar.Brand>
							<a href="#">The React Blog</a>
						</Navbar.Brand>
					</Navbar.Header>
					<ul className="list-unstyled navbar-nav">
						<li className="nav-item"><Link to={Routes.home}>Home</Link></li>
						<li className="nav-item"><Link to={Routes.about}>About</Link></li>
						{renderUserSession()}
					</ul>
				</Navbar>
				<UserLogin 
					showModal={this.state.showLoginModal}
					closeModal={this.closeLoginModal}
				/>
				<UserSignup
					showModal={this.state.showSignupModal}
					closeModal={this.closeSignupModal}
				/>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {auth: state.auth};
}

function mapDispatchToProps(dispatch) {
	return {
		Logout: () => {
			const signOutPromise = UserAPI.logout();
			signOutPromise.then(() => {
				localStorage.clear('loggedInUser');
				dispatch(Logout());
				dispatch(FetchAllPosts());
			});
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(NavbarMain);
