import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { selectCharacter } from './../actions';

import CharacterList from '../components/CharacterList';
import CharacterFullView from './../components/CharacterFullView';
import CharacterBar from './../components/CharacterBar';
import HeroDetails from './../components/HeroDetails';

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
	SlideFromSlightlyAbove,

	SlideUpAndFadeOutAnimation,
	SlideFromTopAndFadeInAnimation,

	DecelerationCurve,
	AccelerationCurve
 } from './../animations';


class CharacterSection extends Component {
	constructor (props) {
		super( props );
	}

	render () {
		const { isSelected, characters, playerIsSelected, characterKeys, selected, selectCharacter } = this.props;
		let view = null;
		let selectedView = null;
		let characterBar = null;

		if ( !playerIsSelected ) {
			return null;
		}

		let animations = {
			entry: {
				animation: FadeInAnimation,
			},
			exit: {animation: FadeOutAnimation}
		};

		let animations2 = {
			entry: {
				animation: SlideFromNearTopAndFadeInAnimation,
				easing: DecelerationCurve
			},
			exit: {
				animation: FadeOutAnimation,
				easing: AccelerationCurve
			}
		};



		if ( isSelected ) {


			selectedView = <HeroDetails
								entryAnimation="entry"
								exitAnimation="exit"
								onSelect={ selectCharacter }
								characters={ characters }
								character={ characters[ isSelected ]} />

		}
		else {
			view = (
				<Animation animations={ animations } mountName="entry">
						<CharacterList characterKeys={ characterKeys }
									exitAnimation="exit"
									characters={ characters }
									screenSize={ this.props.screenSize }
									selectCharacter={ selectCharacter }></CharacterList>
				</Animation>
			)

		}

		return (
			<div className="content">
					{ characterBar }
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