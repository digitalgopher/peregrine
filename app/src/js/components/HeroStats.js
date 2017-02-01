import React, { Component, PropTypes } from 'react';


import Stat from './Stat';

class HeroStats extends Component {



	render () {
		switch ( this.props.heroValue ) {
			case '0x02E0000000000003':
				return < TracerStats stats={ this.props.stats } />
		}
		return <div>
		</div>
	}


}

export default HeroStats



export class TracerStats extends Component {
	render () {
		let { stats } = this.props;
		let statComponents = Object.keys( stats.Game ).map( key => {
			let { name, value } = stats.Game[ key ];
			return <Stat
						key={ key }
						name={ key }
						value={ value }
						label={ name } />
		});


		return <div>
			{ statComponents }
		</div>
	}
}


