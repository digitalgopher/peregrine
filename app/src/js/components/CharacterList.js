import React, { PropTypes, Component } from 'react';
import TransitionGroup from 'react-addons-transition-group';

import Character from './Character';
import { Heroes } from './../modules/heroes';

import Animation from './../animation-components/Animation';
import {
	ScaleUpAnimation,
	ScaleDownAnimation,
	DecelerationCurve } from './../animations';
//css
require( './../../style/characterList.scss');

class CharacterList extends Component {
	constructor (props) {
		super( props );
		this.renderCharacter = this.renderCharacter.bind( this );
		this.onSelectCharacter = this.onSelectCharacter.bind( this );
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
							exit={ ScaleDownAnimation }
							delay={ idx } key={key + idx } >
			<Character
				style={ style }
				isSelected={ this.props.selected === key }
				onSelect={this.onSelectCharacter}
				hero={ Heroes[key] }
				character={ this.props.characters[ key ]}></Character>
			</Animation>
	}

	onSelectCharacter ( key, node ) {
		this.props.selectCharacter( key );
	}

	render () {
		return (
			<div className="character-list">
				<TransitionGroup component="div" className="character-list-animation-container">
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