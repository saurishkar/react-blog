
const UserAPI = {
	login: (userData) => {
		const res = firebase.auth().signInWithEmailAndPassword(userData.email, userData.password);
		// console.log('login', res);
		return res;
	},
	logout: () => {
		const res = firebase.auth().signOut();
		return res;
	},
	signup: (userData) => {
		const res = firebase.auth().createUserWithEmailAndPassword(userData.email, userData.password);
		return res;
	},
	resetPassword: (userData) => {
		// API Call to firebase to send a password reset mail to the registered email id.
		// Check the sendPasswordResetEmail() function in firebase API
	},
	forgotPassword: (userData) => {
		// firebase API call to send a password reset link to user's email
		const res = firebase.auth().sendPasswordResetEmail(userData.email);
		return res;
	}
};

export default UserAPI;