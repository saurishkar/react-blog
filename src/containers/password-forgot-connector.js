import { connect } from 'react-redux';

import PasswordForgot from '../components/admin/password-forgot';
import UserAPI from '../apis/auth';

export function mapDispatchToProps(dispatch) {
	return {
		ForgotPassword: (userData) => {
			const promise = UserAPI.forgotPassword(userData);
			return promise;
		}
	};
}

export default connect(null, mapDispatchToProps)(PasswordForgot);