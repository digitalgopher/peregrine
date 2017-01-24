import React, { Component, PropTypes } from 'react';

class Animation extends Component {

	constructor (props) {
		super( props );
		this._animate = this._animate.bind( this );
		this._clearStyles = this._clearStyles.bind( this );

		this.defaultEffectTiming = {
			delay: 0,
			duration: 400,
			easing: 'ease-in-out'
		}

		this.state = {
			players: null
		}
	}

	_clearStyles ( animation ) {
		Object.keys( animation.initialStyles ).forEach( name => {
			this.refNode.style[ name ] = animation.initialStyles[ name ];
		});
	}

	_animate ( animation, node ) {

		// if( this.refNode.getAnimations()[0]) {
		// 	this.refNode.getAnimations()[ 0 ].cancel();
		// }

		// if ( animationKey === this.props.mountAnimationName ) {
		// 	Object.keys( animation.initialStyles ).forEach( name => {
		// 		this.refNode.style[ name ] = animation.initialStyles[ name ];
		// 	});
		// }
		let timing = Object.assign( {}, {
			delay: this.props.delay ||  this.defaultEffectTiming.delay,
			duration: this.props.duration ||  this.defaultEffectTiming.duration,
			easing: this.props.easing ||  this.defaultEffectTiming.easing
		});

		let player = node.animate(
			animation.keyframes(),
			{
				duration: timing.duration, //milliseconds
				easing: timing.easing, //'linear', a bezier curve, etc.
				delay: timing.delay, //milliseconds
				iterations: 1, //or a number
				direction: 'normal', //'normal', 'reverse', etc.
				fill: 'forwards' //'backwards', 'both', 'none', 'auto'
			}
		);

		// player.pause();
		// console.log( player.playState );
		return player;

		

	}

	// componentWillLeave (callback) {

	// 	if ( !this.props.exit ) {
	// 		callback();
	// 		return;
	// 	}

	// 	let animation = this._animate( this.props.exit );
	// 	animation.onfinish = () => {
	// 		this._clearStyles( this.props.exit );
	// 		callback()
	// 	};
	// }

	// componentWillEnter (callback) {
	// 	if ( !this.props.enter ) {
	// 		callback();
	// 		return;
	// 	}
	// 	let animation = this._animate( this.props.enter );
	// 	animation.onfinish = () => {
	// 		this._clearStyles( this.props.enter );
	// 		callback()
	// 	};
	// }

	// componentWillAppear (callback) {
	// 	if ( !this.props.appear ) {
	// 		callback();
	// 		return;
	// 	}
	// 	let animation = this._animate( this.props.appear );
	// 	animation.onfinish = () => {
	// 		this._clearStyles( this.props.appear );
	// 		callback()
	// 	};
	// }


	componentDidMount () {
		const { animations } = this.props;
		let node = this.refNode;
		let players = Object.keys( animations ).reduce( ( prev, curr) => {
			let startAnimation = () => {
				return this._animate( animations[ curr ], node );
			}
			prev[ curr ] = startAnimation;
			return prev;
		}, {} );
		
		this.setState({
			players: players
		})
	}

	render () {
		const { children } = this.props;
		const child = React.Children.only( children );

		return (
			<div className="animation-item-container" ref={ node => this.refNode = node }>
				{ React.cloneElement ( child, {
					players: this.state.players
				})
			}
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