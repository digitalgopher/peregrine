import React ,{ Component } from 'react';
import Stat from './Stat';

import { OffenseIcon, DefenseIcon }  from './../svg-components';

import { CategoryNames } from './../modules/stats';
require('./../../style/stat.scss');


class StatCategory extends Component {
	constructor (props) {
		super (props);
		this.getIcon = this.getIcon.bind( this );
		this.getFixedCategoryName = this.getFixedCategoryName.bind( this );
	}

	getIcon () {
		switch ( this.props.name ) {
			case 'Combat':
				return <OffenseIcon />;
			default:
				return <span />
		}
	}

	getFixedCategoryName () {
		const { name } = this.props;
		if ( CategoryNames[name]) {
			return CategoryNames[name];
		}
		return name;
	}

	render () {
		let stats = Object.keys( this.props.stats ).map( statName => {
			let statObj = this.props.stats[ statName ];
			return <Stat
						key={ statName }
						name={statName}
						label={ statObj.name }
						value= { statObj.value }></Stat>
		})

		let icon = this.getIcon();
		let categoryName =  this.getFixedCategoryName();

		return (
			<div className="stat-category">
				<div className="stat-category-header">
					<span>{ categoryName }</span>
					<div className="stat-category-icon">
						{ icon }
					</div>
				</div>
				<div className="stat-category-stat-container">
					{ stats }
				</div>
			</div>
		)

	}
}

export default StatCategory