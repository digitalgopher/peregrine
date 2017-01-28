import React, { Component, PropTypes } from 'react';

//using this for now.
import ReactTransitionGroup from 'react-addons-transition-group'

class AnimationGroupItem extends Component {
	constructor (props) {
		super (props);

		this._runAnimation = this._runAnimation.bind( this );

		this._animations = {};
	}

	_runAnimation ( animationDetails ) {
		let { animation, easing, duration, delay } = animationDetails;
		let animationPlayer = this.node.animate( animation.keyframes(), {
			duration: duration || 1000, //milliseconds
			easing: easing || 'ease-in-out', //'linear', a bezier curve, etc.
			delay: delay || 0, //milliseconds
			iterations: 1, //or a number
			direction: 'normal', //'normal', 'reverse', etc.
			fill: 'forwards' //'backwards', 'both', 'none', 'auto'
		});
		return animationPlayer;
	}

	componentWillUnmount () {
		Object.keys( this._animations ).forEach( animation =>  this._animations[animation].cancel() );
	}

	componentWillAppear ( callback ) {
		if ( this.props.appear ) {
			let animationPlayer = this._runAnimation( this.props.appear );
			animationPlayer.onfinish = () => callback();
			this._animations['appear'] = animationPlayer;
			return;
		}
		callback();
	}

	componentWillEnter ( callback ) {
		if ( this.props.enter ) {
			let animationPlayer = this._runAnimation( this.props.enter );
			animationPlayer.onfinish = () => callback();
			this._animations['enter'] = animationPlayer;
			return;
		}
		callback();
	}

	componentWillLeave (callback) {
		if ( this.props.leave ) {
			let animationPlayer = this._runAnimation( this.props.leave );
			animationPlayer.onfinish = () => callback();
			this._animations['leave'] = animationPlayer;
			return;
		}
		callback();
	}



	render ( ) {
		let child = React.Children.only( this.props.children );
		return React.cloneElement( child, {
			ref: instance =>  {
				if ( instance ) { this.node = instance.node }
			}
	});
	}
}




class AnimationGroup extends Component {

	constructor (props) {
		super (props);

		this._entering = [];
		this._leaving = [];
	}

	_runAnimation () {

	}

	componentWillReceiveProps ( nextProps ) {

	}


	render () {

		let children = React.Children.map( this.props.children, child => {
			return (
				<AnimationGroupItem
					appear={ this.props.appear }
					enter={ this.props.enter }
					leave={ this.props.leave } >
					{child}
				</AnimationGroupItem>
			)
		});

		return <ReactTransitionGroup>
				{ children }
		</ReactTransitionGroup>
	}
}




export default AnimationGroup