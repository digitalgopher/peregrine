import React, { Component } from 'react';
import Character from './Character';

require( './../../style/player.scss');

class Player extends Component {

	constructor (props) {
		super( props );
	}

	render () {
		// let qpChars = this.props.value.quickPlayStats;
		// let compChars = this.props.value.compStats;

		// let compCharacterValues = Object.keys( compChars );

		// var chars = compCharacterValues.map( c => {
		// 	return <Character key={ compChars[c].value } character={compChars[c]}></Character>
		// });

		return (
			<div className="player">
				<div className="player-info">				
					
					<div className="player-avatar">
						<img src={ this.props.player.info.avatarUrl } />
					</div>
					<div className="player-name"> {this.props.player.name} </div>
					<div className="player-sr">
						<span>SR</span> 
						<span> { this.props.player.info.SR }</span>
					</div>
				</div>
			</div>
		)

	}


}

export default Player