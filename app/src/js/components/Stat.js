import React, { Component } from 'react';


class Stat extends Component {
	constructor (props) {
		super( props );
	}

	render () {
		return (
			<div>
				<span> <b> { this.props.name } </b> </span>
				<span> {this.props.value} </span>
			</div>
		)
	}
}

export default Stat