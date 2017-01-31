import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

import Player from '../components/Player';
import SearchBox from './../containers/SearchBox';

import CharacterFullView from './../components/CharacterFullView';

import Animation from './../animation-components/Animation';
import RippleAnimation from './../animation-components/RippleAnimation';


import { getCharacter } from './../reducers/characters';

import { clearPlayer } from './../actions';

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
		const { clearPlayer, player, playerIsSelected, stats, heroMain, selectedCharacter, characters } = this.props;

		let playerView = null;
		let searchBoxView = null;
		let ripple = null;

		if ( playerIsSelected ) {

			let selectedCharacterX = selectedCharacter || heroMain;

			playerView =  (
					<Player
						clearPlayer={ clearPlayer }
						player={ player }
						stats={ stats }
						heroMain={ selectedCharacterX }/>
			)

			ripple = <RippleAnimation color="white" />;
		}
		else {
			searchBoxView = (
					<SearchBox />
			)
		}

		return (
			<div className="playerSection">
				{ ripple }
				<div className="content">
						{ playerView }
						{ searchBoxView }
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

	characters: state.characters.byKey,
	heroMain: state.characters.mostPlayed,
	// selectedCharacter: state.characters.selected,
	selectedCharacter: getCharacter( state.characters, state.characters.selected )
});





export default connect( mapStateToProps, { clearPlayer } )( PlayerSection );