import POSTS from '../constants/posts';

export const AllPostsReducer = (state = [], action) => {
	switch(action.type) {
	case POSTS.Add: return [
		...state.posts, 
		action.payload
	];

	case POSTS.Delete: return state.posts.slice(0, action.payload).concat(state.posts.slice(action.payload + 1));
	
	case POSTS.Update:
		return state.posts.slice(0, action.payload.index).concat(action.payload.data).concat(state.posts.slice(action.payload.index + 1));

	case POSTS.FetchAll:
		return action.payload;
	
	default: return state;
	}
};

export const UserPostsReducer = (state = [], action) => {
	switch(action.type) {
	case POSTS.FetchUser:
		return action.payload;
	default : return state;
	}
};

