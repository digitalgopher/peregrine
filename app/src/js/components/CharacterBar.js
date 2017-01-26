import React, { Component, PropTypes } from 'react';

import { Heroes } from './../modules/heroes';

class CharacterBar extends Component {
	constructor (props) {
		super( props );
	}

	render () {

		const { characters } = this.props;
		let characterBlock = Object.keys( characters ).map( val => {
			let style = {
				background: Heroes[ val ].color
			}
			let img = null;
			if ( Heroes[val].icon ) {
				img = <img
						className="character-bar-image"
						src={Heroes[val].icon} />
			}
			return <div
					key={ val }
					onClick={ () => { this.props.onSelect( val ) }}
					className="character-bar-block"
					style={style}>
						{ img }
					</div>
		});

		return <div className="character-bar">
			{characterBlock}

		</div>

	}

}

export default CharacterBar