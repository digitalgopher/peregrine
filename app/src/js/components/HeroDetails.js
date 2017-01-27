import React, { Component, PropTypes } from 'react';


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
			// this.props.onSelect( key );
		}

	}


	componentWillReceiveProps (nextProps) {
		this.setState({
			fullView: {
				playNow: {
					name: 'swapout'
				}
			}
		})
	}


	componentDidUpdate ( nextProps ) {
	// if (nextProps.character.value !== this.props.character.value ) {
	// 		this.setState({
	// 			fullView: {
	// 				playNow: {
	// 					name: 'swapin',
	// 				}
	// 			}
	// 		})
	// 	}
	}

	childAnimationComplete () {
		this.animationsComplete++;
		if (this.animationsComplete === 2) {
			this.props.onSelect( this.key );
		}
	}

	render () {

		const { isSelected, character, characters, playerIsSelected, characterKeys, selected, selectCharacter } = this.props;


		let animations2 = {
			entry: {
				animation: SlideFromNearTopAndFadeInAnimation,
				easing: DecelerationCurve
			},
			exit: {
				animation: FadeOutAnimation,
				easing: AccelerationCurve
			},
			swapout: {
				animation: SlideOffScreenLeft,
				easing: AccelerationCurve
			},
			swapin: {
				animation: SlideFromRightOffScreen,
				easing: DecelerationCurve
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
							characters={ characters }
							onSelect={ this.onSelection } />
					</Animation>
				</div>

				<Animation
					animations={ animations2 }
					mountName="entry"
					playNow={ this.state.fullView.playNow }>
					<CharacterFullView
						exitAnimation="exit"
						onSelect={ this.onSelection }
						character={ character } />
					</Animation>
			</div>
		)

	}
}

export default HeroDetails