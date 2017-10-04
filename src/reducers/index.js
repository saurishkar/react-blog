import { combineReducers } from 'redux';
import {reducer as formReducer} from 'redux-form';

import AddPost from './posts';

const rootReducer = combineReducers({
	form: formReducer,
	posts: AddPost
});

export default rootReducer;