import { connect } from 'react-redux';

import UserAPI from '../apis/auth';
import { Login } from '../actions/auth';
import UserSignup from '../components/admin/user-signup';

export function mapDispatchToProps(dispatch) {
	return {
		Signup: (formData) => {
			const userSignupPromise = UserAPI.signup(formData);
			return userSignupPromise;
		},
		Login: (formData) => {
			const userLoginPromise = UserAPI.login(formData);
			userLoginPromise.then((response) => {
				if(response.uid) {
					localStorage.setItem('loggedInUser', JSON.stringify({user: {email: response.email, uid: response.uid}}));
					dispatch(Login());
				}
			});
			return userLoginPromise;
		}
	};
}

export default connect(null, mapDispatchToProps)(UserSignup);
