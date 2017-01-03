import React, { Component, PropTypes } from 'react';

class CharacterBar extends Component {
	
	constructor ( props ) { 
		super (props);
	}


	render () {
		return ( 
		<div>
			</div>
		)
	}
}

CharacterBar.propTypes = {
	characters: PropTypes.array.isRequired
}

export default CharacterBar