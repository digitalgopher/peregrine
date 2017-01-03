import React, { Component, PropTypes } from 'react';
import StatCategory from './StatCategory';
import { Heroes } from './../modules/heroes';
import { boxShadow } from './../modules/style';
import CharacterCard from './CharacterCard';
import CharacterFullView from './CharacterFullView';

require( './../../style/character.scss');

class CharacterCardWithDetails extends Component {
	
	constructor ( props ) { 
		super (props);
	}

	render () {
		return (
			<div style={{ background: 'red', overflow: 'hidden' }}> 
				<CharacterCard onSelect={this.props.onSelect} character={ this.props.character} ></CharacterCard>
				<CharacterFullView character={ this.props.character }></CharacterFullView>
			</div>
		)
	}
}

CharacterCardWithDetails.propTypes = {
	character: PropTypes.shape({
		stats: PropTypes.object.isRequired
	}).isRequired
}

export default CharacterCardWithDetails