import React, { Component, PropTypes } from 'react';
import { Heroes } from './../modules/heroes';



class PlayerDescription extends Component {
	render () {

		const { stats, name, player, heroMain } = this.props;
		let hero = Heroes[ heroMain.value ];
		let highlightStyle = {
			color: hero.color
		}

		let winPercent = (Math.round( (( stats.Game.GamesWon.value / stats.Game.GamesPlayed.value ) * 100 ) *10) / 10);
		let winPercentHero = (Math.round( (( heroMain.stats.Game.GamesWon.value / heroMain.stats.Game.GamesPlayed.value ) * 100 ) *10) / 10 );

		return (
			<p className="player-description">
				<span style={highlightStyle} className="player-description-highlight">{ player.name }</span>
				<span> is a </span>
				<span style={highlightStyle} className="player-description-highlight">{ hero.name }</span>
				<span> main. With an SR of </span>
				<span style={highlightStyle} className="player-description-highlight">{ player.info.SR }</span>
				<span>. They win </span>
				<span style={highlightStyle} className="player-description-highlight">{ winPercent }%</span>
				<span> of their games in Total, and </span>
				<span style={highlightStyle} className="">{ winPercentHero }%</span>
				<span> when they play as </span>
				<span style={highlightStyle} className="">{ hero.name }</span>
			</p>
		)
	}
}

PlayerDescription.propTypes = {
	player: PropTypes.object.isRequired,
	stats: PropTypes.object.isRequired,
}

export default PlayerDescription