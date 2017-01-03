import React, { Component, PropTypes } from 'react';

require( './../../style/header.scss');

class Header extends Component {
	
	constructor ( props ) { 
		super (props);
	}

	render () {
		return ( 
			<div className="header">
				<div className="header-title">{ this.props.title }</div>
				{ this.props.children }
			</div>
		)
	}
}

export default Header