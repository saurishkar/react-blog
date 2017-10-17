const ADMIN_LOGOUT = 'ADMIN_LOGOUT';
const ADMIN_LOGIN = 'ADMIN_LOGIN';

export const AuthReducer = (state, action) => {
	switch(action.type) {
	case ADMIN_LOGIN: 
		return state;

	case ADMIN_LOGOUT: 
		return state;

	default: return state;
	}
};