const ADD_POST = 'ADD_POST';

const PostsReducer = (state = { posts: [], comments: []}, action) => {
	switch(action.type) {
	case ADD_POST: return {posts: [...state.posts, action.payload], comments: state.comments};
	
	default: return state;
	}
};

export default PostsReducer;