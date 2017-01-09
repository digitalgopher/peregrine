import React, { PropTypes, Component } from 'react';
// import { StaggeredMotion, TransitionMotion, spring, presets } from 'react-motion';
import TransitionGroup from 'react-addons-transition-group';

import Character from './Character';
import { SlideToCenterAnimation } from './../animations/slideToCenter';
import { SlideToNodeAnimation } from './../animations/slideToNode';
import { ScaleUpAnimation } from './../animations/scaleUp';
import { SlideDownAnimation } from './../animations/slideDown';
import FadeIn from './../animation-components/fadeIn';
import FadeOut from './../animation-components/fadeOut';
import Animation from './../animation-components/Animation';

import { DecelerationCurve } from './../animations'

require( './../../style/characterList.scss');

class CharacterList extends Component {
	constructor (props) {
		super( props );
		this.renderCharacter = this.renderCharacter.bind( this );
		this.onSelectCharacter = this.onSelectCharacter.bind( this );
		this.getAnimationDetails = this.getAnimationDetails.bind( this );
	}

	componentDidMount () {
		this.animations = {};
	}

	renderCharacter ( key, idx ) {
		let isSelected = this.props.selected === key;
		let animationContainerStyle = {
			zIndex: isSelected ? 99 : 1,

		}
		let style = {
			opacity: !isSelected && this.props.selected !== null ? 0.5 : 1
		}

		return <Animation appear={ ScaleUpAnimation }
							easing={ DecelerationCurve }
							delay={ idx } key={key + idx } >
			<Character
				style={ style }
				isSelected={ this.props.selected === key }
				onSelect={this.onSelectCharacter}
				character={ this.props.characters[ key ]}></Character>
			</Animation>

		// return <FadeIn style={ animationContainerStyle } delay={ idx } key={key + idx } >
		// 	<Character
		// 		style={ style }
		// 		isSelected={ this.props.selected === key }
		// 		onSelect={this.onSelectCharacter}
		// 		character={ this.props.characters[ key ]}></Character>
		// 	</FadeIn>
	}

	onSelectCharacter ( key, node ) {
		// let prev = this.props.selected;
		// let player = this.animations[ key ];

		this.props.selectCharacter( key );

		// // we have no animation player yet... so let's animate it.
		// if (!player) {
		// 	player = node.animate( SlideToCenterAnimation(node ), this.getAnimationDetails() );
		// 	// player = node.animate( SlideToCenterAnimation( node ), this.getAnimationDetails() );
		// 	this.animations[ key ] = player;
		// }

		// if ( key === this.props.selected ) {
		// 	player.reverse();
		// }
		// else {
		// 	player.playbackRate = 1;
		// 	player.play();
		// 	if ( prev ) {
		// 		this.animations[ prev ].reverse();
		// 	}
		// }
	}

	getAnimationDetails () {
		return {
			duration: 175, //milliseconds
			easing: 'ease-in-out', //'linear', a bezier curve, etc.
			delay: 0, //milliseconds
			iterations: 1, //or a number
			direction: 'normal' , //'normal', 'reverse', etc.
			fill: 'forwards' //'backwards', 'both', 'none', 'auto'
		}
	}

	render () {
		return (
			<div className="characterList">
				<TransitionGroup component="div" className="characterList-animation">
					{ this.props.characterKeys.map( this.renderCharacter )}
				</TransitionGroup>
			</div>
		)
	}
}

CharacterList.propTypes = {
	characterKeys: PropTypes.array.isRequired,
	characters: PropTypes.object.isRequired,
	selectCharacter: PropTypes.func.isRequired,
}

export default CharacterList;