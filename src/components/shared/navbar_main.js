import { Navbar, Nav, NavItem } from 'react-bootstrap';
import React, { Component } from 'react';
import NavbarSub from './navbar_sub';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import UserAPI from '../../apis/auth';
import { Logout } from '../../actions/auth';
import Routes from '../../constants/routes';
import { FetchAllPosts, FetchUserPosts } from '../../actions/posts';
import UserLoginConnector from '../../containers/user-login-connector';
import UserSignupConnector from '../../containers/user-signup-connector';
import PasswordForgotConnector from '../../containers/password-forgot-connector';

class NavbarMain extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showLoginModal: false,
			showSignupModal: false,
			showForgotPasswordModal: false
		};
		this.openLoginModal = this.openLoginModal.bind(this);
		this.closeLoginModal = this.closeLoginModal.bind(this);
		this.openSignupModal = this.openSignupModal.bind(this);
		this.closeSignupModal = this.closeSignupModal.bind(this);
		this.openForgotPasswordModal = this.openForgotPasswordModal.bind(this);
		this.closeForgotPasswordModal = this.closeForgotPasswordModal.bind(this);
	}

	openLoginModal() {
		this.setState({
			showLoginModal: true
		});
		this.closeForgotPasswordModal();
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

	openForgotPasswordModal() {
		this.setState({
			showForgotPasswordModal: true
		});
		this.closeLoginModal();
	}

	closeForgotPasswordModal() {
		this.setState({
			showForgotPasswordModal: false
		});
	}

	render() {
		const renderUserSession = () => {
			if(this.props.auth && this.props.auth.user) {
				return (
					<div>
						<Nav>
							<NavItem href={Routes.index}>My Posts</NavItem>
						</Nav>
						
						<Nav pullRight>
							<NavItem >{this.props.auth.user.email}</NavItem>
							<NavItem onClick={() => this.props.Logout()}>
							Logout
							</NavItem>
						</Nav>
					</div>
				);
			}

			return (
				<Nav pullRight>
					<NavItem onClick={() => this.openSignupModal()}>
						SignUp
					</NavItem>
					<NavItem onClick={() => this.openLoginModal()}>
						Login
					</NavItem>
				</Nav>
			);
		};
		return (
			<div>
				<Navbar fixedTop={true} inverse={true}>
					<Navbar.Header>
						<Navbar.Brand>
							<a href="#">The React Blog</a>
						</Navbar.Brand>
					</Navbar.Header>
					<Navbar.Collapse>
						<Nav>
							<NavItem href={Routes.home}>Home</NavItem>
							<NavItem href={Routes.about}>About</NavItem>
						</Nav>
						{renderUserSession()}
					</Navbar.Collapse>
				</Navbar>
				<UserLoginConnector
					showModal={this.state.showLoginModal}
					closeModal={this.closeLoginModal}
					showForgotPasswordModal={this.openForgotPasswordModal}
				/>
				<UserSignupConnector
					showModal={this.state.showSignupModal}
					closeModal={this.closeSignupModal}
				/>
				<PasswordForgotConnector
					openModal = {this.state.showForgotPasswordModal}
					closeModal = {this.closeForgotPasswordModal}
					showLoginModal = {this.openLoginModal}
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
