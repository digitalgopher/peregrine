import React, { Component } from 'react';

import PlayerDescription from './PlayerDescription';
require( './../../style/player.scss');

class Player extends Component {

	constructor (props) {
		super( props );
	}

	render () {
		const { heroMain } = this.props;
		const { GamesPlayed, GamesWon } = this.props.stats.Game;
		let winLossRecord = `${GamesWon.value} - ${GamesPlayed.value-GamesWon.value} - 0 / ${GamesPlayed.value}`;
		return (
			<div className="player">
				<div className="player-info">
					<div className="player-avatar">
						<img src={ this.props.player.info.avatarUrl } />
					</div>
				</div>
				<div className="player-stats">
					<PlayerDescription heroMain={heroMain} player={this.props.player} stats={ this.props.stats }/>
				</div>
			</div>
		)
	}
}

export default Player


function FirstChild(props) {
  const childrenArray = React.Children.toArray(props.children);
  return childrenArray[0] || null;
}