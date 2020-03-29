import {
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	AUTH_LOADING
} from '../actions/actionTypes';

let initialState = {
	loading: false,
	token: null,
	isAuthenticated: false,
	error: null
};

export default function(state = initialState, action) {
	switch (action.type) {
		case LOGIN_SUCCESS:
			return {
				...state,
				loading: false,
				token: action.token,
				isAuthenticated: true,
				errors: false
			};
		case LOGIN_FAIL:
			return { ...state, loading: false, error: action.error };
		case AUTH_LOADING:
			return { ...state, loading: true };
		default:
			return state;
	}
}
