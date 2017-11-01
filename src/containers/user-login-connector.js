import { connect } from 'react-redux';

import UserLogin from '../components/admin/user-login';
import { Login } from '../actions/auth';
import { FetchUserPosts } from '../actions/posts';
import UserAPI from '../apis/auth';

export function mapStateToProps({auth}) {
	return {auth};
}

export function mapDispatchToProps(dispatch) {
	return {
		Login: (formData) => {
			const userLoginPromise = UserAPI.login(formData);
			userLoginPromise.then((response) => {
				if(response.uid) {
					localStorage.setItem('loggedInUser', JSON.stringify({user: {email: response.email, uid: response.uid}}));
					dispatch(Login());
				}
			});
			
			return userLoginPromise;
		},
		initializeUser: () => {
			dispatch(Login());
			dispatch(FetchUserPosts());
		},
		ForgotPassword: (formData) => {
			const forgotPassPromise = UserAPI.forgotPassword(formData);
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(UserLogin);
