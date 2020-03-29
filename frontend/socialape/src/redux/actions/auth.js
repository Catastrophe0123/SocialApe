import axios from 'axios';
import {
	LOGIN_FAIL,
	LOGIN_SUCCESS,
	AUTH_LOADING,
	SET_USER
} from './actionTypes';

export const asyncLogin = (values, history) => async dispatch => {
	// perform login action here
	try {
		dispatch({ type: AUTH_LOADING });
		let response = await axios.post('/auth/login', values);
		console.log(response);
		window.localStorage.setItem('token', response.data.token);
		axios.defaults.headers.common['Authorization'] = response.data.token;
		dispatch(getUserData());
		dispatch({ type: LOGIN_SUCCESS, token: response.data.token });
		history.push('/');
	} catch (err) {
		console.dir(err);
		dispatch({ type: LOGIN_FAIL, error: err.response.data.message });
	}
};

export const getUserData = () => async dispatch => {
	try {
		let response = await axios.get('/user/');
		dispatch({ type: SET_USER, payload: response.data });
	} catch (error) {
		console.error(error);
	}
};
