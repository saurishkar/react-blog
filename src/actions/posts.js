import * as firebase from 'firebase';

import * as config from '../env';
import { FETCH_POSTS } from '../constants/posts';

const fi = firebase.initializeApp(config.FIREBASE).database();
const Posts = fi;

export function AddPost(data, user) {
	return dispatch => {
		Posts.ref('posts/').child(user).push(data);
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

export function FetchPosts(user) {
	return dispatch => {
		console.log(firebase.auth());
		Posts.ref(`posts/${user}/`).once('value').then(snapshot => {
			dispatch({
				type: FETCH_POSTS,
				payload: snapshot.val()
			});
		
		});
	};
}