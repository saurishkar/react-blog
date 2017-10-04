const ADD_POST = 'ADD_POST';

export function AddPost(data) {
	return {
		type: ADD_POST,
		payload: data
	};
}