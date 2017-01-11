import React, { Component, PropTypes } from 'react';


class StatSmall extends Component {
	render () {
		const { name, value } = this.props;
		return (
			<div className="stat-small">
				<span className="stat-small-value">{value}</span>
				<span className="stat-small-name">{name}</span>
			</div>
		)
	}
}

export default StatSmall;