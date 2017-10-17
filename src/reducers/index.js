import { combineReducers } from 'redux';
import {reducer as formReducer} from 'redux-form';

import PostsReducer from './posts';
import AuthReducer from './auth';

const rootReducer = combineReducers({
	form: formReducer,
	posts: PostsReducer,
	auth: AuthReducer

});

export default rootReducer;