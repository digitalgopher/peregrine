import React, { Component, PropTypes } from 'react';
import StatCategory from './StatCategory';
import { boxShadow } from './../modules/style';
import StatSmall from './StatSmall';

require( './../../style/character.scss');

class CharacterCard extends Component {

	constructor ( props ) {
		super (props);
		this.click = this.click.bind( this );
	}

	click () {
		this.props.onSelect( this.props.character.value );
	}

	render () {
		const { hero, character } = this.props;

		let style = Object.assign({}, this.props.style  );

		if (this.props.isSelected) {
			style = Object.assign( {}, style, {
				boxShadow: boxShadow( hero.color ),
			})
		}

		if ( hero.abilities ) {

		}

		return (
			<div  className="character-card" onClick={ this.click } style={style}>
				<div className="character-card-inner">
					<div className="character-card-name">{ character.name }</div>
					<div className="character-card-icon">

					</div>
					<div className="character-card-stats">
						<StatSmall name={ character.stats.Combat.Eliminations.name } value={ character.stats.Combat.Eliminations.value }/>
					</div>
				</div>
			</div>
		)
	}
}

CharacterCard.propTypes = {
	character: PropTypes.shape({
		stats: PropTypes.object.isRequired
	}).isRequired,
	hero: PropTypes.object.isRequired
}

export default CharacterCard