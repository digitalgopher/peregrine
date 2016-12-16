import React, { Component } from 'react';
import StatCategory from './StatCategory';

class Character extends Component {
	
	constructor ( props ) { 
		super (props);
	}


	render () {

		var categories = Object.keys( this.props.value.stats );

		let statCategories = categories.map( c => {
			return <StatCategory name={ c } stats={ this.props.value.stats[ c ]}></StatCategory>
		});


		return ( 
			<div>
				<h2>{ this.props.value.name }</h2>
				{statCategories}
			</div>
		)
	}
}

export default Character