import React, { Component, PropTypes } from 'react';
import StatCategory from './StatCategory';
import { Heroes } from './../modules/heroes';
import { boxShadow } from './../modules/style';

require( './../../style/character.scss');

class CharacterCard extends Component {
	
	constructor ( props ) { 
		super (props);
		this.click = this.click.bind( this );
	}

	click () {
		this.props.onSelect( this.props.character.value, this.refNode);
	}

	render () {
		let hero = Heroes[ this.props.character.value ];
		let style = Object.assign({}, this.props.style  );
		let characterNameStyle = {
			background: hero.color
		}

		if (this.props.isSelected) {
			style = Object.assign( {}, style, {
				boxShadow: boxShadow( hero.color ),
			})
		}

		return (
				<div  className="character" 
						onClick={ this.click }
						ref={ node => this.refNode = node }
						style={style}>
					<div className="character-name" 
							style={characterNameStyle} >{ this.props.character.name }</div>
					<div className="character-icon">				
						<img src={ hero.ultIcon } />
					</div>
				</div>
		)
	}
}

CharacterCard.propTypes = {
	character: PropTypes.shape({
		stats: PropTypes.object.isRequired
	}).isRequired
}

export default CharacterCard