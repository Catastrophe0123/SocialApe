import { SET_SCREAMS, FETCH_SCREAMS_FAILED } from '../actions/actionTypes';

let initialState = { screams: null, loading: true, error: false };

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_SCREAMS:
			return {
				...state,
				screams: action.screams,
				loading: false,
				error: false
			};
		case FETCH_SCREAMS_FAILED:
			return { ...state, error: true, loading: false };
		default:
			return state;
	}
};

export default reducer;
