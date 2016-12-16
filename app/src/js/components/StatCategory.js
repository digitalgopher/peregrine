import React ,{ Component } from 'react';
import Stat from './Stat';


class StatCategory extends Component {
	constructor (props) {
		super (props);

	}

	render () {
		let stats = Object.keys( this.props.stats ).map( statName => {
			return <Stat name={ statName } value= { this.props.stats[ statName ]}></Stat>
		})
		return (
			<div>
				<h3>{ this.props.name }</h3>
				{ stats }
			</div>
		)

	}
}

export default StatCategory