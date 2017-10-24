import * as firebase from 'firebase';

import * as config from '../env';
import POSTS from '../constants/posts';

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

export function FetchAllPosts() {
	return dispatch => {
		Posts.ref('posts/').once('value').then(snapshot => {
			dispatch({
				type: POSTS.FetchAll,
				payload: snapshot.val()
			});
		
		});
	};
}

export function FetchUserPosts() {
	return dispatch => {
		Posts.ref('posts/').once('value').then(snapshot => {
			const currentUser = localStorage.getItem('loggedInUser');
			const userPosts = Object.entries(snapshot.val()).map((elem) => {
				return elem[1].author_email == currentUser.email ? elem: false;
			});
			dispatch({
				type: POSTS.FetchAll,
				payload: userPosts
			});
		});
	};
}