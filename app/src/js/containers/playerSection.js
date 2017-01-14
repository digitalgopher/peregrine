import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

import Player from '../components/Player';
import SearchBox from './../containers/SearchBox';

import CharacterFullView from './../components/CharacterFullView';

import TransitionGroup from 'react-addons-transition-group';
import Animation from './../animation-components/Animation';

import { getCharacter } from './../reducers/characters';

import {
	FadeInAnimation,
	ScaleDownAnimation,
	ScaleUpAnimation,
	SlideFromRightAnimation,
	SlideRightAnimation,
	SlideLeftAnimation,
	SlideFromLeftAnimation,

	SlideFromRightAndFadeInAnimation,
	SlideRightAndFadeOutAnimation,

	SlideFromLeftAndFadeInAnimation,
	SlideLeftAndFadeOutAnimation
 } from './../animations';


class PlayerSection extends Component {
	constructor (props) {
		super( props );
	}

	render () {
		const { player, playerIsSelected, stats, heroMain, selectedCharacter } = this.props;

		let playerView = null;
		let searchBoxView = null;

		if ( playerIsSelected ) {

			let selectedCharacterX = selectedCharacter || heroMain;

			playerView =  (
				<Animation enter={ SlideFromLeftAndFadeInAnimation } exit={ SlideRightAndFadeOutAnimation }>
					<Player player={ player } stats={ stats } heroMain={ selectedCharacterX }/>
				</Animation>
			)
		}
		else {
			searchBoxView = (
				<Animation enter={ SlideFromRightAndFadeInAnimation } exit={ SlideRightAndFadeOutAnimation }>
					<SearchBox />
				</Animation>
			)
		}

		return (
			<div className="playerSection">
				<div className="player-bg"></div>
				<div className="content">
					<TransitionGroup component="div" className="playerSection-animation-container">
						{ playerView }
						{ searchBoxView }
					</TransitionGroup>
				</div>
			</div>
		)
	}
}

PlayerSection.propTypes = {
	playerIsSelected: PropTypes.bool.isRequired,

	player: PropTypes.object,
	stats: PropTypes.object,

	heroMain: PropTypes.object,
	selectedHero: PropTypes.object,

}



const mapStateToProps = ( state, ownProps ) => ({
	player: state.player,
	playerIsSelected: state.player.info !== null,
	stats: state.player.generalStats || {},

	heroMain: state.characters.mostPlayed,
	selectedCharacter: getCharacter( state.characters, state.characters.selected )
});





export default connect( mapStateToProps, { } )( PlayerSection );