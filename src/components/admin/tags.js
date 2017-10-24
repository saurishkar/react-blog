import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { FetchTags } from '../../actions/tags';

class Tags extends Component {
	constructor(props) {
		super(props);

		this.renderTags = this.renderTags.bind(this);
	}

	renderTags() {
		const list = this.props.tags;
		console.log(list);
		return list.map((elem, index) => {
			return (
				<span key={index}>
					<span className="label label-danger">{elem[1].name}</span>&nbsp;
				</span>
			);
		});
	}

	componentWillMount() {
		this.props.FetchTags();
	}

	render() {
		return (
			<div className="col-sm-6">
				<div className="container">
					<div className="row">
						<h5>Available Tags</h5>
						{ this.renderTags() }
					</div>
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