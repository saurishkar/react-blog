import React, { Component } from 'react';
import { Route, BrowserRouter, Switch, Link } from 'react-router-dom';
import { withCookies, Cookies } from 'react-cookie';

import About from './admin/about';
import Index from './admin/index';
import Home from './admin/home';
import Main from './main';
import * as config from '../env';
import Routes from '../constants/routes';
import NotFound from './not-found';

class App extends Component {
	constructor(props) {
		super(props);
	}

	componentWillMount() {
		firebase.initializeApp(config.FIREBASE);
	}

	render() {
		return (
			<div>
				<Switch>
					<Route path={Routes.about} component={About} />
					<Route path={Routes.index} component={Index} />
					<Route exact path={Routes.home} component={Home} />
					<Route exact path="/" component={Main} />
					<Route path="*" component={NotFound} />
				</Switch>
			</div>
		);
	}
}

export default withCookies(App);