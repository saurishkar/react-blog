import React,{Component} from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';

import NavbarMain from '../partials/navbar_main';
import { FetchPosts } from '../../actions/posts';

class Home extends Component {
	constructor(props) {
		super(props);

		this.renderPosts = this.renderPosts.bind(this);
	}

	componentWillMount() {
		this.props.FetchPosts();
	}

	renderPosts() {

		return Object.entries(this.props.posts).map((elem, index) => {
			return (
				<div className="panel panel-default" key={index}>
					<div className="panel-heading">
						<div className="row">	
							<div className="col-sm-8">
								{elem[1].title}
							</div>
							<div className="col-sm-4" style={{ textAlign: 'right'}}>
								#{index}
							</div>
						</div>
					</div>
					<div className="panel-content">
						<p>{elem[1].content}</p>
					</div>
				</div>
			);
		});
	}

	render() {
		return (
			<div className="home">
				<NavbarMain />
				<div className="container">
					<h3 className="text-center"> Latest Posts </h3>
					<div className="blog-body">
						{ this.renderPosts() }
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