import React, { Component } from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import { withCookies, Cookies } from 'react-cookie';

import NavbarMain from './partials/navbar_main';
import About from './admin/about';
import Index from './admin/index';
import Login from './admin/login';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			showLoginModal: false
		};

		this.openLoginModal = this.openLoginModal.bind(this);
		this.closeLoginModal = this.closeLoginModal.bind(this);
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

	render() {
		return (
			<div>
				<BrowserRouter>
					<div>
						<NavbarMain showLoginModal={this.openLoginModal} />
						<Route path="/about" component={About} />
						<Route path="/blog" component={Index} />
						<Login 
							showModal={this.state.showLoginModal}
							closeModal={this.closeLoginModal}
						/>
					</div>
				</BrowserRouter>
			</div>
		);
	}
}

export default withCookies(App);