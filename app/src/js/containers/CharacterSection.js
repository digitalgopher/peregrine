import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import CharacterList from '../components/CharacterList';
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

		if ( isSelected ) {
			selectedView = (
				<Animation enter={ SlideFromRightAndFadeInAnimation } exit={ SlideRightAndFadeOutAnimation }>
					<div>
						<button onClick={ () => { selectCharacter( null )} } >Back</button>
						<CharacterFullView character={ characters[ isSelected ]}></CharacterFullView>
					</div>
				</Animation>
			)
		}
		else {
			view = (
				<Animation appear={ FadeInAnimation }
							enter={ SlideFromLeftAndFadeInAnimation }
							exit={ SlideLeftAndFadeOutAnimation }>
					<CharacterList characterKeys={ characterKeys }
								characters={ characters }
								selectCharacter={ selectCharacter }></CharacterList>
				</Animation>
			)
		}

		return (
			<div className="content">
				<TransitionGroup component="div" className="characterSection-animation">
					{ view }
					{ selectedView }
				</TransitionGroup>
			</div>
		)
	}
}

CharacterSection.propTypes = {
	characters: PropTypes.object.isRequired,
	isSelected: PropTypes.string.isRequired,

	selectCharacter: PropTypes.func.isRequired
}

const mapStateToProps = ( state, ownProps ) => ({
	characterKeys: state.characters.keys,
	characters: state.characters.byKey,
	playerIsSelected: state.player.name !== null,
	isSelected: state.characters.selected || ''
});

export default connect( mapStateToProps, { selectCharacter } )( CharacterSection );