import React, { Component, PropTypes } from 'react';

require( './../../style/header.scss');

class Header extends Component {

	constructor ( props ) {
		super (props);
	}

	render () {
		return (
			<div className="header">
				<div className="background"></div>
				<div className="intro">
					<div className="header-title">{ this.props.title }</div>
				</div>
			</div>
		)
	}
}

export default Header