import { FETCH_POSTS, ADD_POST, DELETE_POST, UPDATE_POST } from '../constants/posts';

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
	
	case UPDATE_POST:
		return {
			posts: 
				state.posts.slice(0, action.payload.index).concat(action.payload.data).concat(state.posts.slice(action.payload.index + 1))
		};

	case FETCH_POSTS:
		return action.payload;
	
	default: return state;
	}
};

export default PostsReducer;
