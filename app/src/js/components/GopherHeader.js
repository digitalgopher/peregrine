import React, { Component, PropTypes } from 'react';

require('./../../style/header.scss');

class GopherHeader extends Component {


	render () {



		let cssName = 'gopherHeader';

		if ( !this.props.playerIsSelected ) {
			cssName = 'gopherHeader-is-search';
		}

		let style = {
			// height: `${this.props.offset}px`
		}

		return (
			<div className={ cssName }>
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