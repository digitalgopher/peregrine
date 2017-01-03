import React, { Component } from 'react';

export default class FadeIn extends Component {

	constructor (props) {
		super( props );
	}

	componentWillAppear (callback) {
		this.refNode.animate([
			{ opacity: 0, offset: 0 },
			{ opacity: 1, offset: 1 }
		], {
			duration: 700, //milliseconds
			easing: 'ease-in-out', //'linear', a bezier curve, etc.
			delay: this.props.delay * 50, //milliseconds
			iterations: 1, //or a number
			direction: 'normal', //'normal', 'reverse', etc.
			fill: 'forwards' //'backwards', 'both', 'none', 'auto'
		});
		
		callback();
	}
	
	render () {
		let style = Object.assign( {}, this.props.style, { 
			opacity: 0,
		})
		return ( 
			<span ref={ node => this.refNode = node }
				style={ style }> { this.props.children }  </span> 
		)
	}
}