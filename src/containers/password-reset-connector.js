import { connect } from 'react-redux';

import UserAPI from '../apis/auth';
import PasswordReset from '../components/admin/password-reset';

export function mapDispatchToProps(dispatch) {
	return {
		ChangePassword: (userData) => {
			if (userData.password === userData.password_confirm)
			{
				// Send a firebase request to update the new password.
			} else {
				// Handle this error and throw a validation error back.
			}
		}
	};
}

export default connect(null, mapDispatchToProps)(PasswordReset);