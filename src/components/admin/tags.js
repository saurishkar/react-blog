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
		return list.map((elem, index) => {
			return (
				<td key={index}>
					<h5>
						<span className="label label-danger">
							{elem[1].name}
						</span>
						<input 
							className="tag-check"
							type="checkbox" 
							name={`check_${elem[0]}`} 
							onChange = {(e) => this.props.handleChange(e, elem[0])}
						/>
					</h5>
				</td>
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
						<table>
							<tbody>
								<tr>
									{ this.renderTags() }
								</tr>
							</tbody>
						</table>
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
