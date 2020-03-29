import { SET_USER } from '../actions/actionTypes';

let initialState = {};

export default function(state = initialState, action) {
	switch (action.type) {
		case SET_USER:
			return { ...state, ...action.payload };
		default:
			return state;
	}
}
