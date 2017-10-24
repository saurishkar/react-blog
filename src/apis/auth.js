
const UserAPI = {
	login: (userData) => {
		const res = firebase.auth().signInWithEmailAndPassword(userData.email, userData.password);
		// console.log('login', res);
		return res;
	},
	logout: () => {
		const res = firebase.auth().signOut();
		return res;
	}
};

export default UserAPI;