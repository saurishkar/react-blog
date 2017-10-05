import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';

export class DeleteModal extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<Modal show={this.props.showDeleteModal} onHide={this.props.closeDeleteModal}>
					<Modal.Header closeButton>
						<h4 className="text-center">Delete Post</h4>
					</Modal.Header>
					<Modal.Body>
						<p className="text-center">Are you sure you want to <span className="text-danger">Delete</span> this post ?</p>
					</Modal.Body>
					<Modal.Footer>
						<div className="btn-group">
							<button className="btn btn-danger" onClick={() => this.props.deletePost()}>Delete</button>
							<button className="btn btn-default" onClick={() => this.props.closeDeleteModal()}>Cancel</button>
						</div>
					</Modal.Footer>
				</Modal>
			</div>
		);
	}
}

export class EditModal extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<Modal show={this.props.showEditModal} onHide={this.props.closeEditModal}>
					<Modal.Header closeButton>
						<h4 className="text-center">Edit Post</h4>
					</Modal.Header>
					<Modal.Body>

					</Modal.Body>
					<Modal.Footer>
						<div className="btn-group">
							<button className="btn btn-success" type="submit">Save</button>
							<button className="btn btn-default" onClick={()=> this.props.closeEditModal()}>Cancel</button>
						</div>
					</Modal.Footer>

				</Modal>
			</div>
		);
	}
}