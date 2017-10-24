
import POSTS from '../constants/posts';
import FirebaseApi from '../apis/firebase';

export function AddPost(data) {
	return dispatch => {
		return FirebaseApi.AddPost(data);
	};
}

export function DeletePost(key) {
	return dispatch => {
		return FirebaseApi.DeletePost(key);
	};
}

export function UpdatePost(key, data) {
	return dispatch => {
		return FirebaseApi.UpdatePost(key, data);
	};
}

export function FetchAllPosts() {
	return dispatch => {
		const promise = FirebaseApi.FetchPosts();
		promise.then(snapshot => {
			dispatch({
				type: POSTS.FetchAll,
				payload: Object.entries(snapshot.val())
			});
		});
	};
}

export function FetchUserPosts() {
	return dispatch => {
		const promise = FirebaseApi.FetchPosts();
		promise.then(snapshot => {
			const currentUser = JSON.parse(localStorage.getItem('loggedInUser'));
			if (currentUser) {
				const userPosts = Object.entries(snapshot.val()).filter((elem) => {
					if (elem[1].author_email == currentUser.user.email)
						return true;
				});
				dispatch({
					type: POSTS.FetchUser,
					payload: userPosts
				});
			}
		});
	};
}