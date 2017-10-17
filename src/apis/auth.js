
const UserAPI = {
	login: (userData) => {
		return firebase.auth().signInWithEmailAndPassword(userData.email, userData.password);
	}
};

export default UserAPI;