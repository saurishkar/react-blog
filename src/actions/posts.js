const ADD_POST = 'ADD_POST';
const DELETE_POST = 'DELETE_POST';

export function AddPost(data) {
	return {
		type: ADD_POST,
		payload: data
	};
}

export function DeletePost(data) {
	return {
		type: DELETE_POST,
		payload: data
	};
}