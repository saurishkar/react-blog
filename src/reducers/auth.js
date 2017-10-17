const ADMIN_LOGOUT = 'ADMIN_LOGOUT';
const ADMIN_LOGIN = 'ADMIN_LOGIN';

const AuthReducer = (state = {}, action) => {
	switch(action.type) {
	case ADMIN_LOGIN: 
		return action.payload;

	case ADMIN_LOGOUT: 
		return state;

	default: return state;
	}
};

export default AuthReducer;