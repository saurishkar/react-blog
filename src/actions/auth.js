const ADMIN_LOGIN = 'ADMIN_LOGIN';
const ADMIN_LOGOUT = 'ADMIN_LOGOUT';

export const Login = (data) => {
	return {
		type: ADMIN_LOGIN,
		payload: data
	};
};

export const Logout = (data) => {
	return {
		type: ADMIN_LOGOUT,
		payload: data
	};
}; 