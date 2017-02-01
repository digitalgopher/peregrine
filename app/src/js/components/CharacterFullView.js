import React, { Component, PropTypes } from 'react';

import StatCategory from './StatCategory';
import Character from './Character';

import HeroStats from './HeroStats';

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
		const { character } = this.props;
		let categories = Object.keys( this.props.character.stats );
		categories = categories.map( cat => <StatCategory
												name={ cat }
												key={ cat }
												stats={ this.props.character.stats[ cat ]}> </StatCategory>
									)




		return (

				<div className="characterFullView" ref={ node => this.node = node } >
					<span>{ this.props.character.name }</span>
					<HeroStats heroValue={ character.value} stats={ character.stats } />
			</div>
		)
	}


}

CharacterFullView.propTypes = {
	character: PropTypes.object.isRequired,
}

export default CharacterFullView