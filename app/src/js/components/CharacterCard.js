import React, { Component, PropTypes } from 'react';
import StatCategory from './StatCategory';
import { boxShadow } from './../modules/style';
import StatSmall from './StatSmall';

import RippleAnimation from './../animation-components/RippleAnimation';

require( './../../style/character.scss');

class CharacterCard extends Component {

	constructor ( props ) {
		super (props);
		this.click = this.click.bind( this );
		this.state = {
			mouseDownEvent: null,
			mouseUpEvent: null
		}
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

		let elimsName = "Eliminations";
		let elims = 0;
		if (character.stats.Combat.Eliminations) {
			elims = character.stats.Combat.Eliminations.value;
		}


		return (
			<div  className="character-card" style={style}>
				<div className="character-card-inner">
					<div className="character-card-name">{ character.name }</div>
					<div className="character-card-icon">

					</div>
					<div className="character-card-stats">
						<StatSmall
							name={ elimsName }
							value={ elims }/>
					</div>
				</div>

				<RippleAnimation onFinish={ this.click } color={ hero.color }/>
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