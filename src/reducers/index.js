import { combineReducers } from 'redux';
import {reducer as formReducer} from 'redux-form';

import { AllPostsReducer, UserPostsReducer } from './posts';
import AuthReducer from './auth';
import TagsReducer from './tags';

const rootReducer = combineReducers({
	form: formReducer,
	posts: AllPostsReducer,
	userPosts: UserPostsReducer,
	auth: AuthReducer,
	tags: TagsReducer

});

export default rootReducer;