import React, { Component, PropTypes } from 'react';

require('./../../style/header.scss');

class GopherHeader extends Component {


	render () {

		const cssName = `gopher-header-${this.props.size}`;

		let style = {
			// height: `${this.props.offset}px`
		}

		return (
			<div className="gopher-header" style={ style }>
				<div className="gopher-header-inner">
					<div className="gopher-header-bg"></div>
					<div className="gopher-header-bg-color-splash"></div>
					{ this.props.children }
				</div>
			</div>
		)
	}

}

export default GopherHeader;