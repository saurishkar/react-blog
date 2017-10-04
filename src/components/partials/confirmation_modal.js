import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';

class DeleteModal extends Component {
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

export default DeleteModal;