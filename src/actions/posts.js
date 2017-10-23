import * as firebase from 'firebase';

import * as config from '../env';
import { FETCH_POSTS } from '../constants/posts';

const fi = firebase.initializeApp(config.FIREBASE).database();
const Posts = fi;

export function AddPost(data) {
	return dispatch => {
		Posts.child('posts').push(data);
	};
}

export function DeletePost(key) {
	return dispatch => {
		Posts.child(`posts/${key}`).remove();
	};
}

export function UpdatePost(key, data) {
	return dispatch => {
		Posts.child(`posts/${key}`).update(data);
	};
}

export function FetchPosts() {
	return dispatch => {
		const loggedUser = JSON.parse(localStorage.getItem('loggedInUser'));
		if (loggedUser && loggedUser.user) {
			Posts.ref(`/posts/${loggedUser.user.uid}/`).once('value').then(snapshot => {
			  	dispatch({
					type: FETCH_POSTS,
					payload: snapshot.val()
				});
			});
		} else {
			// No user is signed in.
		}
		// });
	};
}