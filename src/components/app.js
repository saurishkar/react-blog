import React, { Component } from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import NavbarMain from './partials/navbar_main';
import About from './admin/about';
import Index from './admin/index';

class App extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<BrowserRouter>
					<div>
						<NavbarMain />
						<Route path="/about" component={About} />
						<Route path="/blog" component={Index} />
					</div>
				</BrowserRouter>
			</div>
		);
	}
}

export default App;