import * as firebase from 'firebase';
import * as config from '../env';

const firedb = firebase.initializeApp(config.FIREBASE).database();

const FirebaseApi = {
	AddPost: (data) => {
		return firedb.ref().child('posts/').push(data);
	},
	DeletePost: (key) => {
		return firedb.ref('posts/').child(`${key}`).remove();
	},
	UpdatePost: (key, data) => {
		return firedb.ref('posts/').child(`${key}`).update(data);
	},
	FetchPosts: () => {
		const FetchPromise = firedb.ref('posts/').once('value');
		return FetchPromise;
	},
	FetchTags: () => {
		const FetchPromise = firedb.ref('tags/').once('value');
		return FetchPromise;
	},
	CreateTag: (data) => {
		return firedb.ref().child('tags/').push(data);
	}
};

export default FirebaseApi;