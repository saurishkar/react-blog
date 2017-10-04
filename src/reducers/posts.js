const ADD_POST = 'ADD_POST';

const PostsReducer = (state = {}, action) => {
	switch(action.type) {
	case ADD_POST: return state['posts'].assign(action.payload);

	default: return state;
	}
};

export default PostsReducer;