import { combineReducers } from 'redux';
import {reducer as formReducer} from 'redux-form';

const rootReducer = () => {
	return combineReducers({
		posts: formReducer

	});
};

export default rootReducer;