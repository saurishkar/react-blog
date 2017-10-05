const ADD_POST = 'ADD_POST';
const DELETE_POST = 'DELETE_POST';
const FETCH_POST = 'FETCH_POST';
const UPDATE_POST = 'UPDATE_POST';

const PostsReducer = (state = { posts: [], comments: []}, action) => {
	switch(action.type) {
	case ADD_POST: return {
		posts: [
			...state.posts, 
			action.payload
		], 
		comments: state.comments
	};

	case DELETE_POST: return { 
		posts: 
			state.posts.slice(0, action.payload).concat(state.posts.slice(action.payload + 1))
	};

	case FETCH_POST: 
		return {
			post: state.posts[action.payload]
		};

	case UPDATE_POST:
		return {
			posts: 
				state.posts.slice(0, action.payload.index).concat(action.payload.data).concat(state.posts.slice(action.payload.index + 1))
		};
	
	default: return state;
	}
};

export default PostsReducer;