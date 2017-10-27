import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { FetchTags, CreateTag } from '../../actions/tags';

class Tags extends Component {
	constructor(props) {
		super(props);
		this.state = {
			tagName: ''
		};
		this.renderTags = this.renderTags.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(event) {
		event.preventDefault();
		if(this.state.tagName != '') {
			const tagObj = {
				name: this.state.tagName
			};
			const promise = this.props.CreateTag(tagObj);
			promise.then((response) => {
				this.props.FetchTags();
				this.setState({
					tagName: ''
				});
			});
		}
	}

	renderTags() {
		const list = this.props.tags;
		return list.map((elem, index) => {
			return (
				<span key={index}>
					<big>
						<span className="label label-primary">
							{elem[1].name}
						</span>
						<input 
							className="tag-check"
							type="checkbox" 
							name={`tag[${index}].checkbox`} 
							onChange = {(e) => this.props.handleChange(e, elem)}
						/>
					</big>
				</span>
			);
		});
	}

	componentWillMount() {
		this.props.FetchTags();
	}

	render() {
		return (
			<div>
				<label>Tags</label>
				<div className="row">
					<div className="col-sm-10 no-gutters">
						<div className="input-group">
							<span className="input-group-addon">Tag Name</span>
							<input 
								type="text" 
								name="tagName" 
								className="form-control" 
								onChange={(event) => this.setState({tagName: event.target.value})}
								value={this.state.tagName}
							/>
						</div>
					</div>
					<div className="col-sm-2 no-gutters">
						<button 
							readOnly={this.state.tag ? '': 'disabled'} 
							className="btn btn-md btn-default form-control"
							onClick={(event) => this.handleClick(event)}
						>	
								Create
						</button>
					</div>
				</div>
				<br />
				<div className="row">
					<div className="col-sm-12">
						{ this.renderTags() }
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
