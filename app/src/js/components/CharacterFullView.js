import React, { Component, PropTypes } from 'react';

import StatCategory from './StatCategory';
import Character from './Character';

require( './../../style/character.scss');



class CharacterFullView extends Component {
	constructor (props) {
		super (props);
		this.back = this.back.bind( this );
	}

	back () {
		this.props.onSelect( null );
	}



	render () {

		let categories = Object.keys( this.props.character.stats );
		categories = categories.map( cat => <StatCategory
												name={ cat }
												key={ cat }
												stats={ this.props.character.stats[ cat ]}> </StatCategory>
									)




		return (

				<div className="characterFullView">
					<span>{ this.props.character.name }</span>
					<button onClick={ this.back } >Back</button>
					{ categories }
			</div>
		)
	}


}

CharacterFullView.propTypes = {
	character: PropTypes.object.isRequired,
}

export default CharacterFullView