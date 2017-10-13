import * as firebase from 'firebase';

import * as config from '../constants/firebase';
import { FETCH_POSTS } from '../constants/posts';

const fi = firebase.initializeApp(config).database().ref();
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
		Posts.on('value', snapshot => {
			dispatch({
				type: FETCH_POSTS,
				payload: snapshot.val()
			});
		});
	};
}