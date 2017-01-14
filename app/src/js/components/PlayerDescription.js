import React, { Component, PropTypes } from 'react';
import { Heroes } from './../modules/heroes';



class PlayerDescription extends Component {
	render () {
		const { stats, name, player, heroMain } = this.props;
		const hero = Heroes[ heroMain.value ];
		let highlightStyle, totalGamesWon, gamesWonAsHero;
		let winPercent, winPercentHero = 0;

		totalGamesWon = stats.Game.GamesWon
		 if ( totalGamesWon ) {
			 winPercent = (Math.round( (( totalGamesWon.value / stats.Game.GamesPlayed.value ) * 100 ) *10) / 10);
		 }

		 gamesWonAsHero = heroMain.stats.Game.GamesWon;
		 if ( gamesWonAsHero ) {
			 winPercentHero = (Math.round( (( gamesWonAsHero.value / heroMain.stats.Game.GamesPlayed.value ) * 100 ) *10) / 10 );
		 }

		highlightStyle = { color: hero.color };

		return (
			<p className="player-description">
				<span style={highlightStyle} className="player-description-highlight">{ player.name }</span>
				<span> is a </span>
				<span style={highlightStyle} className="player-description-highlight">{ hero.name }</span>
				<span> main. With an SR of </span>
				<span style={highlightStyle} className="player-description-highlight">{ player.info.SR }</span>
				<span>. They win </span>
				<span style={highlightStyle} className="player-description-highlight">{ winPercent }%</span>
				<span> of their games in total, and </span>
				<span style={highlightStyle} className="player-description-highlight">{ winPercentHero }%</span>
				<span> when they play as </span>
				<span style={highlightStyle} className="player-description-highlight">{ hero.name }</span>
			</p>
		)
	}
}

PlayerDescription.propTypes = {
	player: PropTypes.object.isRequired,
	stats: PropTypes.object.isRequired,
}


function getGamesWon (value) {
	return value || 0;
}

export default PlayerDescription