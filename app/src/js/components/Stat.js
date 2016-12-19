import React, { Component } from 'react';

require('./../../style/stat.scss');

class Stat extends Component {
	constructor (props) {
		super( props );
	}

	render () {
		return (
			<div className="stat">
				<div className="stat-name"> <b> { this.props.name } </b> </div>
				<div className="stat-value"> {this.props.value} </div>
			</div>
		)
	}
}

export default Stat