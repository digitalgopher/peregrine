import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

import Player from '../components/Player';
import SearchBox from './../containers/SearchBox';

import { selectCharacter } from './../actions';
import CharacterFullView from './../components/CharacterFullView';

import TransitionGroup from 'react-addons-transition-group';
import Animation from './../animation-components/Animation';


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
		const { player, playerIsSelected, stats } = this.props;

		let playerView = null;
		let searchBoxView = null;

		if ( playerIsSelected ) {
			playerView =  (
				<Animation enter={ SlideFromLeftAndFadeInAnimation } exit={ SlideRightAndFadeOutAnimation }>
					<Player player={ player } stats={ stats }/>
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
	player: PropTypes.object.isRequired,
	playerIsSelected: PropTypes.bool.isRequired,
	stats: PropTypes.object.isRequired
}



const mapStateToProps = ( state, ownProps ) => ({
	player: state.player,
	playerIsSelected: state.player.info !== null,
	stats: state.player.generalStats || {}
});





export default connect( mapStateToProps, { selectCharacter } )( PlayerSection );