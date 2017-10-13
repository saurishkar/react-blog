import React,{Component} from 'react';

import NavbarMain from '../partials/navbar_main';

class Home extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<NavbarMain />
				<h3 className="text-center"> This is the Home Page of the application </h3>
			</div>
		);
	}
}

export default Home;