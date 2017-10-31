
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
	forgotPass: (userData) => {
		// API Call to firebase to send a password reset mail to the registered email id.
		// Check the sendPasswordResetEmail() function in firebase API
	}
};

export default UserAPI;