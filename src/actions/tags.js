import TAGS from '../constants/tags';
import FirebaseApi from '../apis/firebase';

export function FetchTags() {
	return dispatch => {
		const promise = FirebaseApi.FetchTags();
		promise.then((snapshot) => {
			dispatch({
				type: TAGS.FETCH_TAGS,
				payload: Object.entries(snapshot.val())
			});
		});
	};
}

