import {
	FETCH_SCREAMS,
	SET_SCREAMS,
	FETCH_SCREAMS_FAILED
} from './actionTypes';
import axios from 'axios';

export const fetchScreams = () => async dispatch => {
	try {
		const response = await axios.get('/screams');
		dispatch({ type: SET_SCREAMS, screams: response.data });
	} catch (err) {
		dispatch({ type: FETCH_SCREAMS_FAILED });
	}
};
