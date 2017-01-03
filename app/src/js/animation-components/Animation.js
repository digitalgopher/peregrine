import React, { Component, PropTypes } from 'react';

class Animation extends Component {

	constructor (props) {
		super( props );
	}

	componentWillAppear (callback) {
		Object.keys( this.props.enter.initialStyles ).forEach( name => {
			this.refNode.style[ name ] = this.props.enter.initialStyles[ name ];
		});
		// this.refNode.style = Object.assign( {}, this.props.enter.initialStyles );
		this.refNode.animate(
			this.props.enter.keyframes(),
			{
				duration: 500, //milliseconds
				easing: 'ease-in-out', //'linear', a bezier curve, etc.
				delay: this.props.delay * 100, //milliseconds
				iterations: 1, //or a number
				direction: 'normal', //'normal', 'reverse', etc.
				fill: 'forwards' //'backwards', 'both', 'none', 'auto'
			}
		);
		callback();
	}

	render () {		
		return (
			<span ref={ node => this.refNode = node }>
				{ this.props.children }
			</span> 
		)
	}
}


export default Animation