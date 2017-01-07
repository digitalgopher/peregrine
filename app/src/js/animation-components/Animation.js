import React, { Component, PropTypes } from 'react';

class Animation extends Component {

	constructor (props) {
		super( props );

		this._animate = this._animate.bind( this );
	}
	_animate ( animation ) {

		if( this.refNode.getAnimations()[0]) {
			this.refNode.getAnimations()[ 0 ].cancel();
		}

		Object.keys( animation.initialStyles ).forEach( name => {
			this.refNode.style[ name ] = animation.initialStyles[ name ];
		});

		let delayStart = this.props.delay || 0;
		this.refNode.animate(
			this.props.enter.keyframes(),
			{
				duration: 500, //milliseconds
				easing: 'ease-in-out', //'linear', a bezier curve, etc.
				delay: delayStart * 50, //milliseconds
				iterations: 1, //or a number
				direction: 'normal', //'normal', 'reverse', etc.
				fill: 'forwards' //'backwards', 'both', 'none', 'auto'
			}
		);
	}

	componentWillLeave (callback) {

		if ( !this.props.exit ) {
			callback();
			return;
		}

		this._animate( this.props.exit );
		callback();

	}

	componentWillAppear (callback) {
		this._animate( this.props.enter );
		callback();
	}

	render () {
		return (
			<div className="animation-container" ref={ node => this.refNode = node }>
				{ this.props.children }
			</div>
		)
	}
}


export default Animation