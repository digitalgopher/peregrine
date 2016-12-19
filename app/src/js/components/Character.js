import React, { Component, PropTypes } from 'react';
import StatCategory from './StatCategory';

require( './../../style/character.scss');

class Character extends Component {
	
	constructor ( props ) { 
		super (props);
	}


	render () {

		var categories = Object.keys( this.props.character.stats );

		let statCategories = categories.map( c => {
			return <StatCategory name={ c }
								key={ this.props.character.value + "-stats-" + c }
								stats={ this.props.character.stats[ c ]}></StatCategory>
		});


		return ( 
			<div className="character">
				<div className="character-name">{ this.props.character.name }</div>
				<span> { 'Character Val: ' + this.props.character.value } </span>
				<div className="character-stats-container">
					{statCategories}
				</div>
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