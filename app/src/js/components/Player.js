import React, { Component } from 'react';
import Character from './Character';

require( './../../style/player.scss');

class Player extends Component {

	constructor (props) {
		super( props );
	}

	render () {

		return (
			<div className="player">
				<div className="player-info">
					<div className="player-avatar">
						<img src={ this.props.player.info.avatarUrl } />
					</div>
					<div className="player-name"> {this.props.player.name} </div>
					<div className="">
						<span> Games Played </span>
						<span> { this.props.stats.Game.GamesPlayed.value } </span>
					</div>
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