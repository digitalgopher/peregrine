import React, { Component, PropTypes } from 'react';

class OffenseIcon extends Component {
	constructor ( props ) {
		super (props );
	}
	render () {
		return (
			<svg fill="green" viewBox="0 0 32 32" role="presentation">
			<title>Offense</title>
			<g>
				<rect x="2.1" y="28.1" width="7.1" height="3.9"></rect>
				<path d="M9.1,7c0,0,0-0.5,0-0.7C8.6,1.5,5.6,0,5.6,0s-3,1.5-3.5,6.3c0,0.2,0,0.7,0,0.7v18.4h3.5h3.5V7z"></path>
			</g>
			<g>
				<rect x="12.5" y="28.1" width="7.1" height="3.9"></rect>
				<path d="M19.5,7c0,0,0-0.5,0-0.7C19,1.5,16,0,16,0s-3,1.5-3.5,6.3c0,0.2,0,0.7,0,0.7v18.4H16h3.5V7z"></path>
			</g>
			<g>
				<rect x="22.9" y="28.1" width="7.1" height="3.9"></rect>
				<path d="M29.9,7c0,0,0-0.5,0-0.7C29.4,1.5,26.4,0,26.4,0s-3,1.5-3.5,6.3c0,0.2,0,0.7,0,0.7v18.4h3.5h3.5V7z"></path>
			</g>
		</svg>
		)
	}
}

export default OffenseIcon;