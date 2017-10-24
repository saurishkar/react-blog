import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { FetchTags } from '../../actions/tags';

class Tags extends Component {
	constructor(props) {
		super(props);
	}

	renderTags() {

	}

	componentWillMount() {
		this.props.FetchTags();
	}

	render() {
		return (
			<div className="col-sm-6">
				<div className="container">
					<span>
						<p> Add <span className="label label-info">Tags</span> or Create </p>
						<button className="btn btn-sm btn-danger">Create a New Tag</button>
					</span>
				</div>
				
				<br />

			</div>
		);
	}
}

function mapStateToProps({ tags }) {
	return { tags };
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ FetchTags }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Tags);