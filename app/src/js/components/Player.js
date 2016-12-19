import React, { Component } from 'react';
import Character from './Character';

class Player extends Component {

	constructor (props) {
		super( props );
	}

	render () {
		let qpChars = this.props.value.quickPlay;
		let compChars = this.props.value.competitive;

		var chars = compChars.map( c => {
			return <Character key={ c.value } character={c}></Character>
		});

		return (
			<div>
				{ chars }
			</div>
		)

	}


}

export default Player