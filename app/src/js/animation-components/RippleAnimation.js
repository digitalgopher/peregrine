import React, { PropTypes, Component } from 'react';

require('./../../style/ripple.scss');

class RippleAnimation extends Component {
	constructor (props) {
		super( props );

		this.state = {
			isAnimating: false
		}

		this.onParentClick = this.onParentClick.bind( this );

		this.allWaves = [];

	}

	componentDidMount () {
		this.parent = this.container.parentNode;
		this.parent.addEventListener( 'click', this.onParentClick );
	}

	componentWillUnmount () {
		this.parent.removeEventListener('click', this.onParentClick );
		this.allWaves.forEach( node => {
			this.waves.removeChild( node );
		});
	}

	onParentClick (event) {
		React;


		let rect = this.parent.getBoundingClientRect();
		let max = Math.max( rect.height, rect.width );

		let yStart = event.clientY - rect.top;
		let xStart = event.clientX - rect.left;

 		let wave = document.createElement('div');
		let waveContainer = document.createElement('div');

		waveContainer.style.height =  max + 'px' ;
		waveContainer.style.width = max + 'px' ;



		waveContainer.style.transform = 'scale( 0, 0 )';
		waveContainer.style.left = xStart - ( max  / 2) + 'px';
		waveContainer.style.top =  yStart - (max  / 2) + 'px';


		wave.style.backgroundColor = this.props.color;
		wave.classList.add('wave');
		waveContainer.classList.add('wave-container');
		waveContainer.appendChild(wave);

		this.waves.appendChild( waveContainer );

		let animation = waveContainer.animate([
			{ transform: 'scale(0, 0)', opacity: 0.25, offset: 0 },
			{ transform: 'scale(2)', opacity: 0, offset: 1 }
		],
		{
				duration:  400, //milliseconds
				easing: 'ease-in-out', //'linear', a bezier curve, etc.
				delay: 0, //milliseconds
				iterations: 1, //or a number
				direction: 'normal', //'normal', 'reverse', etc.
				fill: 'forwards' //'backwards', 'both', 'none', 'auto'
			}
		)

		this.allWaves.push( waveContainer );

		animation.onfinish = () => {
			this.waves.removeChild( this.allWaves.shift() );
			animation.cancel();
			if ( this.props.onFinish ) {
				this.props.onFinish();
			}
		}
	}

	render () {



		return <div className="ripple-animation" ref={ node => this.container = node }>
			<div className="background"></div>
			<div ref={ node => this.waves = node } className="waves"></div>
		</div>
	}
}

export default RippleAnimation