import React, { Component, PropTypes } from 'react';

import StatCategory from './StatCategory';
import Character from './Character';

require( './../../style/character.scss');



class CharacterFullView extends Component {
	constructor (props) {
		super (props);
	}


	render () {

		let categories = Object.keys( this.props.character.stats );
		categories = categories.map( cat => <StatCategory key={ cat} stats={ this.props.character.stats[ cat ]}> </StatCategory> )

		return (
				<div className="characterFullView">
				<div className="characterFullView-scrollable">
					{ categories }
				</div>
			</div>
		)
	}


}

CharacterFullView.propTypes = {
	character: PropTypes.object.isRequired,
}

export default CharacterFullView