import React, { Component } from 'react';
import Character from './Character';

class Player extends Component {

	constructor (props) {
		super( props );
	}

	render () {
		let qpChars = this.props.value.quickPlayStats;
		let compChars = this.props.value.compStats;

		let compCharacterValues = Object.keys( compChars );

		var chars = compCharacterValues.map( c => {
			return <Character key={ compChars[c].value } character={compChars[c]}></Character>
		});

		return (
			<div>
				{ chars }
			</div>
		)

	}


}

export default Player