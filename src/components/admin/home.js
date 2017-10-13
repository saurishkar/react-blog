import React,{Component} from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';

import NavbarMain from '../partials/navbar_main';
import { FetchPosts } from '../../actions/posts';

class Home extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.props.FetchPosts();
	}

	render() {
		return (
			<div className="home">
				<NavbarMain />
				<div className="container">
					<h3 className="text-center"> This is the Home Page of the application </h3>
					<div className="pane">
					</div>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return state.posts;
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({FetchPosts}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);