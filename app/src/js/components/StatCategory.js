import React ,{ Component } from 'react';
import Stat from './Stat';

require('./../../style/stat.scss');


class StatCategory extends Component {
	constructor (props) {
		super (props);

	}

	render () {
		let stats = Object.keys( this.props.stats ).map( statName => {
			let statObj = this.props.stats[ statName ];
			return <Stat key={ statName } name={ statObj.name } value= { statObj.value }></Stat>
		})
		return (
			<div className="statCategory">
				<div>{ this.props.name }</div>
				{ stats }
			</div>
		)

	}
}

export default StatCategory