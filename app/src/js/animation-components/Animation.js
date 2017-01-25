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

	_animate ( animationDetails, node ) {

		const { easing, animation, delay, duration } = animationDetails;

		Object.keys( animation.initialStyles ).forEach( name => {
			node.style[ name ] = animation.initialStyles[ name ];
		});

		let timing = Object.assign( {}, {
			delay: delay ||  0,
			duration: duration ||  400,
			easing: easing ||  'ease-in-out'
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

		return player;
	}

	componentDidMount () {
		const { animations } = this.props;
		let node = this.refNode;
		let players = Object.keys( animations ).reduce( ( result, animationName ) => {
			if ( this.props.mountName === animationName ) {
				result[animationName ] = this._animate( animations[ animationName ], node )
			}
			result[ animationName ] = () => {
				return this._animate( animations[ animationName ], node );
			}
			return result;
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