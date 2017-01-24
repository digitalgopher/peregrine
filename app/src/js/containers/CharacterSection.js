import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import CharacterList from '../components/CharacterList';
import { selectCharacter } from './../actions';
import CharacterFullView from './../components/CharacterFullView';

import TransitionGroup from 'react-addons-transition-group';
import Animation from './../animation-components/Animation';


import {
	FadeInAnimation,
	FadeOutAnimation,

	ScaleDownAnimation,
	ScaleUpAnimation,
	SlideFromRightAnimation,
	SlideRightAnimation,
	SlideLeftAnimation,
	SlideFromLeftAnimation,

	SlideFromRightAndFadeInAnimation,
	SlideRightAndFadeOutAnimation,

	SlideFromLeftAndFadeInAnimation,
	SlideLeftAndFadeOutAnimation,

	SlideDownAndFadeOutAnimation,
	SlideFromBottomAndFadeInAnimation,
	SlideFromNearTopAndFadeInAnimation,

	SlideUpAndFadeOutAnimation,
	SlideFromTopAndFadeInAnimation
 } from './../animations';


class CharacterSection extends Component {
	constructor (props) {
		super( props );
	}

	render () {
		const { isSelected, characters, playerIsSelected, characterKeys, selected, selectCharacter } = this.props;
		let view = null;
		let selectedView = null;

		if ( !playerIsSelected ) {
			return null;
		}

		let animations = {
			fadein: FadeInAnimation,
			fadeout: FadeOutAnimation
		};

		let animations2 = {
			fadein: FadeInAnimation, 
			fadeout: FadeOutAnimation
		};

		if ( isSelected ) {
			selectedView = (
				<Animation animations = { animations2 } mountAnimationName="fadein" >					
					<CharacterFullView entryAnimation="fadein" exitAnimation="fadeout" onSelect={ selectCharacter } character={ characters[ isSelected ]}></CharacterFullView>
				</Animation>
			)
		}
		else {
			view = (
				<Animation animations={ animations } mountAnimationName="fadein">
						<CharacterList characterKeys={ characterKeys }
									entryAnimation="fadein"
									exitAnimation="fadeout"
									characters={ characters }
									screenSize={ this.props.screenSize }
									selectCharacter={ selectCharacter }></CharacterList>
				</Animation>
			)
		}

		return (
			<div className="content">
					{ view }
					{ selectedView }
			</div>
		)
	}
}

CharacterSection.propTypes = {
	characters: PropTypes.object.isRequired,
	isSelected: PropTypes.string.isRequired,

	selectCharacter: PropTypes.func.isRequired,
	screenSize: PropTypes.string
}

const mapStateToProps = ( state, ownProps ) => ({
	characterKeys: state.characters.keys,
	characters: state.characters.byKey,
	playerIsSelected: state.player.name !== null,
	isSelected: state.characters.selected || '',
	screenSize: state.ui.mediaQuery || 'LARGE'
});

export default connect( mapStateToProps, { selectCharacter } )( CharacterSection );