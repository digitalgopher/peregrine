import React, { Component, PropTypes } from 'react';

import { Heroes } from './../modules/heroes';
import { boxShadow } from './../modules/style';

import CharacterCard from './CharacterCard';
import RippleAnimation from './../animation-components/RippleAnimation';

require( './../../style/character.scss');

class Character extends Component {

	constructor ( props ) {
		super (props);
		this.onCharacterCardSelect = this.onCharacterCardSelect.bind( this );
	}

	onCharacterCardSelect (key) {
		this.props.onSelect( key, this.refNode );
	}

	render () {
		return <CharacterCard
				character={ this.props.character }
				hero={ this.props.hero }
				onSelect={this.onCharacterCardSelect}></CharacterCard>
	}
}

Character.propTypes = {
	character: PropTypes.shape({
		stats: PropTypes.object.isRequired
	}).isRequired
}

export default Character