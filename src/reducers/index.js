import { combineReducers } from 'redux';
import {reducer as formReducer} from 'redux-form';

import { AllPostsReducer, UserPostsReducer } from './posts';
import AuthReducer from './auth';

const rootReducer = combineReducers({
	form: formReducer,
	posts: AllPostsReducer,
	userPosts: UserPostsReducer,
	auth: AuthReducer

});

export default rootReducer;