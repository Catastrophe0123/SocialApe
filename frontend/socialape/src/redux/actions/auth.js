import axios from 'axios';
import { LOGIN_FAIL, LOGIN_SUCCESS, AUTH_LOADING } from './actionTypes';

export const asyncLogin = values => async dispatch => {
	// perform login action here
	try {
		dispatch({ type: AUTH_LOADING });
		console.log('reached here');
		let response = await axios.post('/auth/login', values);
		console.log(response);
		window.localStorage.setItem('token', response.data.token);
		dispatch({ type: LOGIN_SUCCESS, token: response.data.token });
	} catch (err) {
		dispatch({ type: LOGIN_FAIL, error: err.response.data.message });
	}
};
