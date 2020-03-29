import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../redux/actions/actionTypes.js';
import { fetchScreams } from '../redux/actions/screams.js';
import Scream from '../components/Scream';

class Home extends Component {
	componentDidMount = async () => {
		// const screams = await axios.get('/screams');
		// console.log(screams);
		// this.setState({
		//     screams: screams.data
		// });

		// we got the screams from async redux
		this.props.fetchScreams();
	};

	render() {
		console.log(this.props.screams);
		console.log(this.props.loading);
		let screams = {};

		return (
			<div>
				{this.props.loading ? (
					<p>Loading...</p>
				) : (
					this.props.screams.map(scream => {
						return <Scream key={scream.id} {...scream} />;
					})
				)}
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		screams: state.screams.screams,
		loading: state.screams.loading,
		error: state.screams.error
	};
};

// const mapDispatchToProps = dispatch => {
// 	return { fetchScreams: dispatch(fetchScreams()) };
// };

const mapDispatchToProps = { fetchScreams: fetchScreams };

export default connect(mapStateToProps, mapDispatchToProps)(Home);
