import React, { Component } from 'react';

import { ValueSuffix } from './../modules/stats';


require('./../../style/stat.scss');

class Stat extends Component {
	constructor (props) {
		super( props );
	}

	render () {
		const { value, name, label } = this.props;
		let displayValue = value;
		if ( ValueSuffix[ name ]) {
			displayValue += ValueSuffix[name];
		}

		return (
			<div className="stat">
				<div className="stat-value"> { displayValue } </div>
				<div className="stat-name"> { label }</div>
			</div>
		)
	}
}

export default Stat