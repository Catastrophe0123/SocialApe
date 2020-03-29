import React, { Component } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

class Scream extends Component {
	render() {
		dayjs.extend(relativeTime);
		return (
			<div>
				{this.props.user.userHandle} : {this.props.body} - posted{' '}
				{dayjs(this.props.createdAt).fromNow()}
			</div>
		);
	}
}

export default Scream;
