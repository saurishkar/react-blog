import * as firebase from 'firebase';

import * as config from '../env';
import POSTS from '../constants/posts';

const fi = firebase.initializeApp(config.FIREBASE).database();
const Posts = fi;

export function AddPost(data) {
	return dispatch => {
		Posts.ref().child('posts/').push(data);
	};
}

export function DeletePost(key, user) {
	return dispatch => {
		Posts.ref('posts/').child(`${user}/${key}`).remove();
	};
}

export function UpdatePost(key, user, data) {
	return dispatch => {
		Posts.ref('posts/').child(`${user}/${key}`).update(data);
	};
}

export function FetchAllPosts() {
	return dispatch => {
		Posts.ref('posts/').once('value').then(snapshot => {
			dispatch({
				type: POSTS.FetchAll,
				payload: Object.entries(snapshot.val())
			});
		
		});
	};
}

export function FetchUserPosts() {
	return dispatch => {
		Posts.ref('posts/').once('value').then(snapshot => {
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