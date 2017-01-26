import React, { Component, PropTypes } from 'react';


import CharacterFullView from './CharacterFullView';
import CharacterBar from './CharacterBar';

import Animation from './../animation-components/Animation';
import AnimationComposer from './../animation-components/AnimationComposer';

import {
	SlideFromNearTopAndFadeInAnimation,
	SlideFromSlightlyAbove,

	SlideUpAnimation,

	SlideLeftAnimation,
	SlideFromRightAnimation,

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
		if ( key == null || key === this.props.character.value ) {
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


			this.setState({
				fullView: {
					playNow: {
						name: 'swapout',
						onfinish: () => {
							this.props.onSelect( key )
						}
					}
				}
			})

			// this.props.onSelect( key );
		}

	}

	componentDidUpdate ( prevProps, prevState ) {
		if (prevProps.character.value !== this.props.character.value ) {
			this.setState({
				fullView: {
					playNow: {
						name: 'swapin',
					}
				}
			})
		}
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
				animation: SlideLeftAnimation
			},
			swapin: {
				animation: SlideFromRightAnimation
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
			< div >
				<Animation
					animations={ animations3 }
					mountName="entry"
					playNow={ this.state.characterBar.playNow }>
					<CharacterBar
						characters={ characters }
						onSelect={ this.onSelection } />
				</Animation>

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