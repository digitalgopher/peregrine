import React, { Component, PropTypes } from 'react';

import AnimationGroup from './../animation-components/AnimationGroup';

import CharacterFullView from './CharacterFullView';
import CharacterBar from './CharacterBar';

import Animation from './../animation-components/Animation';

import {
	SlideFromNearTopAndFadeInAnimation,
	SlideFromSlightlyAbove,
	SlideDownAndScaleDownAnimation,

	SlideUpAnimation,

	SlideOffScreenLeft,
	SlideFromRightOffScreen,


	SlideLeftAnimation,
	SlideFromRightAnimation,

	SlideDownAnimation,

	FadeOutAnimation,

	DecelerationCurve,
	AccelerationCurve
} from './../animations';

class HeroDetails extends Component {
	constructor (props) {
		super(props);

		this.onSelection = this.onSelection.bind( this );
		this.childAnimationComplete = this.childAnimationComplete.bind( this );

		this.state = {
			characterBar: {
				playNow: {}
			},
			fullView: {
				playNow: {}
			}
		}
	}

	onSelection ( key ) {
		if (key === '0x02E00000FFFFFFFF' || key == null || key === this.props.character.value ) {
			this.animationsComplete = 0;
			this.setState({
				characterBar: {
					playNow: {
						name: 'exit',
						onfinish: () => this.childAnimationComplete()
					}
				},
				fullView: {
					playNow: {
						name: 'exit',
						onfinish: () => this.childAnimationComplete()
					}
				}
			});
		}
		else {

			this.props.onSelect( key )
		}

	}


	childAnimationComplete () {
		this.animationsComplete++;
		if (this.animationsComplete === 1) {
			this.props.onSelect( this.key );
		}
	}

	render () {

		const { isSelected, character, characters, playerIsSelected, characterKeys, selected, selectCharacter } = this.props;


		let animations2 = {
			appear: {
				animation: SlideFromNearTopAndFadeInAnimation,
				easing: DecelerationCurve
			},
			leave: {
				animation: FadeOutAnimation,
				easing: AccelerationCurve
			},
			enter: {
				animation: SlideLeftAnimation,
				easing: AccelerationCurve,
				duration: 175
			}

		};

		let animations3 = {
			entry: {
				animation: SlideFromSlightlyAbove,
				easing: DecelerationCurve,
			},
			exit: {
				animation: SlideUpAnimation
			}
		}

		return (
			< div className="hero-details">
				<div className="character-bar-container">
					<Animation
						animations={ animations3 }
						mountName="entry"
						playNow={ this.state.characterBar.playNow }>
						<CharacterBar
							selected={ this.props.character.value }
							characters={ characters }
							onSelect={ this.onSelection } />
					</Animation>
				</div>

				<AnimationGroup
					appear={ animations2.appear }
					enter={ animations2.enter }
					leave={ animations2.leave }>
					<CharacterFullView
						onSelect={ this.onSelection }
						character={ character } />
				</AnimationGroup>
			</div>
		)

	}
}

export default HeroDetails