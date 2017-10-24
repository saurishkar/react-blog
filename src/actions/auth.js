import { ADMIN_LOGIN, ADMIN_LOGOUT } from '../constants/auth';

export const Login = () => {
	return {
		type: ADMIN_LOGIN,
		payload: JSON.parse(localStorage.getItem('loggedInUser'))
	};
};

export const Logout = () => {
	return {
		type: ADMIN_LOGOUT,
		payload: {}
	};
}; 