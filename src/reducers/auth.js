const ADMIN_LOGOUT = 'ADMIN_LOGOUT';
const ADMIN_LOGIN = 'ADMIN_LOGIN';

export const AuthReducer = (state, action) => {
	switch(action.type) {
	case ADMIN_LOGIN: //Check Login Credentials

		firebase.auth().signInWithEmailAndPassword(action.payload.email, action.payload.password).catch((error) {
			console.log("Error", error);
		});
		return;

	case ADMIN_LOGOUT: // Logout the current user and update the state
		return;

	default: return state;
	}
};