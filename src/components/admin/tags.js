import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { FetchTags, CreateTag } from '../../actions/tags';

class Tags extends Component {
	constructor(props) {
		super(props);
		this.state = {
			tag: ''
		};
		this.renderTags = this.renderTags.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(event) {
		event.preventDefault();
		if(this.state.tag != '') {
			const tagObj = {
				name: this.state.tag
			};
			const promise = this.props.CreateTag(tagObj);
			promise.then((response) => {
				this.props.FetchTags();
				this.setState({
					tag: ''
				});
			});
		}
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
				<div className="row">
					<div className="col-sm-12"><h5 className="text-center">Tags</h5></div>
					<div className="col-sm-12">
						{ this.renderTags() }
					</div>
				</div>
				<div className="row">
					<div className="col-sm-12 text-center">
						<div className="input-group form-group">
							<span className="input-group-addon">Tag Name</span>
							<input 
								type="text" 
								name="tag_name" 
								className="form-control" 
								onChange={(event) => this.setState({tag: event.target.value})}
								value={this.state.tag}
							/>
						</div>
						<button 
							readOnly={this.state.tag ? '': 'disabled'} 
							className="btn btn-sm btn-danger form-control"
							onClick={(event) => this.handleClick(event)}
						>	
								Create
						</button>
					</div>
				</div>
			</div>
		);
	}
}

function mapStateToProps({ tags }) {
	return { tags };
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ FetchTags, CreateTag }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Tags);
