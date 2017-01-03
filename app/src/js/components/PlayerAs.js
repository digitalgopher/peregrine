import React, { Component } from 'react';

import Character from './Character';
import Player from './../containers/Player';
require( './../../style/player.scss');

class PlayerAs extends Component {

	constructor (props) {
		super( props );
	}

	render () {
		return (
			<div className="playerAs">
				<Player />
				<span> AS </span>
				<div id="mysupercooldiv"> </div>
			</div>
		)

	}


}

export default PlayerAs