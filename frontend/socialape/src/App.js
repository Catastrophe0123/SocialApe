import React from 'react';
import { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login/Login';
import Navbar from './components/Navbar';

class App extends Component {
	render() {
		return (
			<Router>
				<Navbar />
				<Switch>
					<Route exact path='/' component={Home} />
					<Route exact path='/login' component={Login} />
					<Route exact path='/signup' component={Signup} />
				</Switch>
			</Router>
		);
	}
}

export default App;
