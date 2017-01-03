import React, { Component } from 'react';

require('./../../style/stat.scss');

class Stat extends Component {
	constructor (props) {
		super( props );
	}

	render () {
		return (
			<div className="stat">
				<div className="stat-name"> { this.props.name }</div>
				<div className="stat-value"> {this.props.value} </div>
			</div>
		)
	}
}

export default Stat