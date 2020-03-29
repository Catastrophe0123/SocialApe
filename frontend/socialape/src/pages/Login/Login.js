import React, { Component } from 'react';
import classes from '../Login/Login.module.css';
import { Field, Form, withFormik, prepareDataForValidation } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import { asyncLogin } from '../../redux/actions/auth';

const Input = ({
	field, // { name, value, onChange, onBlur }
	form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
	...props
}) => {
	console.log(props);
	return (
		<div className={classes.inputs}>
			{touched.email && errors.email && <p>{errors.email}</p>}
			{/* <p>{errors}</p> */}
			<input
				type='text'
				name='email'
				value={field.value.email}
				{...props}
				onChange={field.onChange}
				placeholder='email'
			/>
			{touched.password && errors.password && <p>{errors.password}</p>}
			<input
				value={field.value.password}
				onChange={field.onChange}
				{...props}
				type='password'
				name='password'
				id='password'
				placeholder='password'
			/>

			{props.loading ? <p>LOADING...</p> : null}

			{props.error && <p> {props.error} </p>}
		</div>
	);
};

class Login extends Component {
	render() {
		return (
			<div>
				<div className={classes.container}>
					<div className={classes.maincontainer}>
						<div className={classes.content}>
							<div className={classes.title}>
								Hello there, welcome back
							</div>
							<Form>
								<Field
									component={Input}
									error={this.props.error}
									loading={this.props.loading}
								/>
								<button type='submit'>Submit</button>
							</Form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const FormikLogin = withFormik({
	mapPropsToValues({ email, password, ...props }) {
		return {
			email: email || '',
			password: password || ''
		};
	},
	validationSchema: Yup.object().shape({
		email: Yup.string()
			.email()
			.required(),
		password: Yup.string()
			.min(5)
			.required()
	}),
	handleSubmit(values, { props }) {
		props.asyncLogin(values);
	}
})(Login);

const mapStateToProps = state => {
	return {
		loading: state.auth.loading,
		error: state.auth.error
	};
};
const mapDispatchToProps = { asyncLogin };

export default connect(mapStateToProps, mapDispatchToProps)(FormikLogin);
