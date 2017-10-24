import * as firebase from 'firebase';
import * as config from '../env';

const fi = firebase.initializeApp(config.FIREBASE).database();
const Posts = fi;

const FirebaseApi = {
	AddPost: (data) => {
		return Posts.ref().child('posts/').push(data);
	},
	DeletePost: (key) => {
		return Posts.ref('posts/').child(`${key}`).remove();
	},
	UpdatePost: (key, data) => {
		return Posts.ref('posts/').child(`${key}`).update(data);
	},
	FetchPosts: () => {
		const FetchPromise = Posts.ref('posts/').once('value');
		return FetchPromise;
	}
};

export default FirebaseApi;