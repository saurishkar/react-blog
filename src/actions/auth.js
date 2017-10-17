import { ADMIN_LOGIN, ADMIN_LOGOUT } from '../constants/auth';
import userAPI from '../apis/auth';

export const Login = (response) => {
	return {
		type: ADMIN_LOGIN,
		payload: response
	};
};

export const Logout = () => {
	return {
		type: ADMIN_LOGOUT,
		payload: {}
	};
}; 