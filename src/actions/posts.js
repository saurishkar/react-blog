const ADD_POST = 'ADD_POST';
const DELETE_POST = 'DELETE_POST';
const UPDATE_POST = 'UPDATE_POST';
const FETCH_SELECTED = 'FETCH_SELECTED';

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

export function UpdatePost(index, data) {
	return {
		type: UPDATE_POST,
		payload: {data: data, index: index}
	};
}