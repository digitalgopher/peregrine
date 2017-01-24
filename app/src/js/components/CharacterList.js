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

		return <Character
				key={ key }
				style={ style }
				isSelected={ this.props.selected === key }
				onSelect={this.onSelectCharacter}
				hero={ Heroes[key] }
				character={ this.props.characters[ key ]}></Character>
	}

	componentDidUpdate ( prevProps, prevState ) {
		const { entryAnimation, players } = this.props;
		if ( players[ entryAnimation ] ) {
			players[ entryAnimation ]();
		}
	}

	onSelectCharacter ( key, node ) {
		const { exitAnimation, players } = this.props;
		const animation = players[ exitAnimation ](); 
		animation.onfinish = ( ) => {
			this.props.selectCharacter( key );
		}
	}

	

	render () {
		return (
			<div className="character-list">
					{ this.props.characterKeys.map( this.renderCharacter )}
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