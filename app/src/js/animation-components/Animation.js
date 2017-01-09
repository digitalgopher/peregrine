import React, { Component, PropTypes } from 'react';

class Animation extends Component {

	constructor (props) {
		super( props );
		this._animate = this._animate.bind( this );
		this._clearStyles = this._clearStyles.bind( this );

		this.defaultEffectTiming = {
			delay: 0,
			duration: 300,
			easing: 'ease-in-out'
		}
	}

	_clearStyles ( animation ) {
		Object.keys( animation.initialStyles ).forEach( name => {
			this.refNode.style[ name ] = animation.initialStyles[ name ];
		});
	}

	_animate ( animation ) {

		if( this.refNode.getAnimations()[0]) {
			this.refNode.getAnimations()[ 0 ].cancel();
		}

		Object.keys( animation.initialStyles ).forEach( name => {
			this.refNode.style[ name ] = animation.initialStyles[ name ];
		});

		let timing = Object.assign( {}, {
			delay: this.props.delay ||  this.defaultEffectTiming.delay,
			duration: this.props.duration ||  this.defaultEffectTiming.duration,
			easing: this.props.easing ||  this.defaultEffectTiming.easing
		});

		return this.refNode.animate(
			animation.keyframes(),
			{
				duration: timing.duration, //milliseconds
				easing: timing.easing, //'linear', a bezier curve, etc.
				delay: timing.delay * 50, //milliseconds
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

		let animation = this._animate( this.props.exit );
		animation.onfinish = () => {
			this._clearStyles( this.props.exit );
			callback()
		};
	}

	componentWillEnter (callback) {
		if ( !this.props.enter ) {
			callback();
			return;
		}
		let animation = this._animate( this.props.enter );
		animation.onfinish = () => {
			this._clearStyles( this.props.enter );
			callback()
		};
	}

	componentWillAppear (callback) {
		if ( !this.props.appear ) {
			callback();
			return;
		}
		let animation = this._animate( this.props.appear );
		animation.onfinish = () => {
			this._clearStyles( this.props.appear );
			callback()
		};
	}



	render () {
		return (
			<div className="animation-container" ref={ node => this.refNode = node }>
				{ this.props.children }
			</div>
		)
	}
}

Animation.propTypes = {

	duraction: PropTypes.number,
	easing: PropTypes.string,

	appear: PropTypes.shape({
		initialStyles: PropTypes.object.isRequired,
		keyframes: PropTypes.func.isRequired
	}),

	enter: PropTypes.shape({
		initialStyles: PropTypes.object.isRequired,
		keyframes: PropTypes.func.isRequired
	}),

	exit: PropTypes.shape({
		initialStyles: PropTypes.object.isRequired,
		keyframes: PropTypes.func.isRequired
	}),


}

export default Animation