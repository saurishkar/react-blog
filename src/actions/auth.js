import { ADMIN_LOGIN, ADMIN_LOGOUT } from '../constants/auth';

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