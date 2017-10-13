import React, { Component } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import { withCookies, Cookies } from 'react-cookie';

import About from './admin/about';
import Index from './admin/index';
import Home from './admin/home';

class App extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<BrowserRouter>
					<Switch>
						<Route path="/about" component={About} />
						<Route path="/blog" component={Index} />
						<Route exact path="/" component={Home} />
					</Switch>
				</BrowserRouter>
			</div>
		);
	}
}

export default withCookies(App);