import POSTS from '../constants/posts';

export const AllPostsReducer = (state = [], action) => {
	switch(action.type) {
	case POSTS.Add: return action.payload;

	case POSTS.Delete: return action.payload;
	
	case POSTS.Update: return action.payload;

	case POSTS.FetchAll: return action.payload;
	
	default: return state;
	}
};

export const UserPostsReducer = (state = [], action) => {
	switch(action.type) {
	case POSTS.FetchUser: return action.payload;
	
	default : return state;
	}
};

