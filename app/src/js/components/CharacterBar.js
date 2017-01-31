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
				background: Heroes[ val ].color,
				zIndex: ''
			}
			let className = 'character-bar-block';
			if (  this.props.selected === val ) {
				style.zIndex=  99;
				className += ' character-bar-block-is-selected';
			}


			let img = null;
			if ( Heroes[val].icon ) {
				img = <img
						className="character-bar-image"
						src={Heroes[val].icon} />
			}
			return <li
					key={ val }
					onClick={ () => { this.props.onSelect( val ) }}
					className={className}
					style={style}>
						{ img }
					</li>
		});

		// test. create select box
		if ( matchMedia("(max-width: 500px)").matches ) {

			let stuff = Object.keys( characters ).map( val => <option value={ characters[val].value }> { characters[val].name}  </option> )
			return <div className="character-bar">
				<select onChange={ (e) => this.props.onSelect( e.target.value )}>
					{ stuff }
				</select>
			</div>
		}


		return <div className="character-bar">
			<ul className="character-bar-list">
				{characterBlock}
			</ul>
		</div>

	}

}

export default CharacterBar