import React,{Component} from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';

import NavbarMain from '../shared/navbar_main';
import { FetchPosts } from '../../actions/posts';

class Home extends Component {
	constructor(props) {
		super(props);

		this.renderPosts = this.renderPosts.bind(this);
	}

	componentDidMount() {
		this.props.FetchPosts();
	}

	renderPosts() {
		if (this.props.posts.length > 0) {
			return this.props.posts.map((elem, index) => {
				return (
					<div className="panel panel-primary" key={index}>
						<div className="panel-heading">
							<div className="row">	
								<div className="col-sm-8">
									{elem.title}
								</div>
								<div className="col-sm-4" style={{ textAlign: 'right'}}>
								#{index + 1}
								</div>
							</div>
						</div>
						<div className="panel-body">
							<p>{elem.content}</p>
						</div>
						<div className="panel-footer" style={{ textAlign: 'right'}}>
							<i>{elem.last_updated}</i>
						</div>
					</div>
				);
			});
		}
	}

	render() {
		return (
			<div>
				<div className="header-nav"><NavbarMain /></div>
				<div className="container">
					<h3 className="text-center"> Latest Posts </h3>
					<div className="posts">
						{ this.renderPosts() }
					</div>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {posts: state.posts};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({FetchPosts}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);