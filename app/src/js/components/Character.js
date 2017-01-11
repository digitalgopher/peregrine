import React, { Component, PropTypes } from 'react';
import StatCategory from './StatCategory';
import { Heroes } from './../modules/heroes';
import { boxShadow } from './../modules/style';

import CharacterCard from './CharacterCard';

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
		let view = null;

		view = <CharacterCard character={ this.props.character }
							onSelect={this.onCharacterCardSelect}></CharacterCard>

		return (
			<div ref={ node => this.refNode = node }>
				{ view }
			</div>
		)

	}
}

Character.propTypes = {
	character: PropTypes.shape({
		stats: PropTypes.object.isRequired
	}).isRequired
}

export default Character