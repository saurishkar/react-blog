import React,{Component} from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';

import NavbarMain from '../shared/navbar_main';
import { FetchAllPosts } from '../../actions/posts';

class Home extends Component {
	constructor(props) {
		super(props);

		this.renderPosts = this.renderPosts.bind(this);
	}

	componentDidMount() {
		this.props.FetchAllPosts();
	}

	renderPosts() {
		const list = this.props.posts;
		if (list.length > 0) {
			return list.map((elem, index) => {
				return (
					<div className="col-sm-12" key={index}>
						<div className="jumbotron">
							<div className="row">
								<div className="col-sm-8">
									<div className="post-head">
										<h2>{elem[1].title}</h2>
										<span>
											<small>	{elem[1].author_email}</small>&nbsp;
											<small><i>{elem[1].last_updated}</i></small>
										</span><br/>
									</div>
								</div>
								<div className="col-sm-4">
									<img alt="sample-post-image" />
								</div>
							</div>
							<div className="post-body">
								<p>{elem[1].content}</p>
								<p></p>
							</div>
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
					<h3>Latest Feed</h3>
					<div className="posts">
						<div className="row">{ this.renderPosts() }</div>
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
	return bindActionCreators({FetchAllPosts}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);