import TAGS from '../constants/tags';

const TagsReducer = (state = [], action) => {
	switch(action.type) {
	case TAGS.FETCH_TAGS: return action.payload;

	default: return state;
	}
};

export default TagsReducer;