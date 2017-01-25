import React, { Component, PropTypes } from 'react';

import StatCategory from './StatCategory';
import Character from './Character';

import { OffenseIcon, DefenseIcon }  from './../svg-components';


require( './../../style/character.scss');



class CharacterFullView extends Component {
	constructor (props) {
		super (props);
		this.back = this.back.bind( this );
	}

	back () {
		const { exitAnimation, players } = this.props;
		let animation = players[ exitAnimation ]();
		animation.onfinish = () => {
			this.props.onSelect( null );
		};
	}

	componentDidUpdate (prevProps, prevState) {
		const { entryAnimation, players } = this.props;
		if ( players[ entryAnimation ] ) {
			players[ entryAnimation ]();
		}
	}

	render () {

		let categories = Object.keys( this.props.character.stats );
		categories = categories.map( cat => <StatCategory key={ cat} stats={ this.props.character.stats[ cat ]}> </StatCategory> )

		return (

				<div className="characterFullView">
					<button onClick={ this.back } >Back</button>
					<div style={{ width: '50px', height: '50px' }}>
					<OffenseIcon />
					<DefenseIcon />
					</div>
					{ categories }
			</div>
		)
	}


}

CharacterFullView.propTypes = {
	character: PropTypes.object.isRequired,
}

export default CharacterFullView