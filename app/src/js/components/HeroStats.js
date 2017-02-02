import React, { Component, PropTypes } from 'react';

import { Heroes, GetHeroDetails } from './../modules/heroes';

import Stat from './Stat';

class HeroStats extends Component {
	render () {

		let inner = null;

		// switch ( this.props.heroValue ) {
		// 	case '0x02E0000000000003':
		// 		inner = < TracerStats details={ GetHeroDetails('0x02E0000000000003') }
		// 							  stats={ this.props.stats } />
		// 		break;
		// 	default:
		// 		inner = <div> </div>
		// }

		inner = <TracerStats details={ GetHeroDetails( this.props.heroValue )}  stats={this.props.stats } />

		return <div className="heroStats">
			{ inner }
			<div className="heroStats-card">Hello</div>
		</div>
	}
}

export default HeroStats


export class TracerStats extends Component {
	render () {
		let { stats } = this.props;
		let { hero, details } = this.props.details;
		let categories = details.display.map( _category => {
			return <StatCollectionContainer
						key={ _category.icon }
						stats={ stats }
						paths={ _category.statPaths }
						image={ hero.images[_category.icon ]} />
		});

		return <div className="heroStats-main">
			{ categories }
		</div>
	}
}

const StatCollectionContainer = ({ image, paths, stats }) => {
	return (
		<div className="heroStats-card">
			<div className="heroStats-statCollectionContainer">
				<AbilityIcon image={ image } />
				<StatCollection paths={ paths } stats={ stats } />
			</div>
		</div>
	)
}

const AbilityIcon = ({ image }) => {
	return (
		<div className="heroStats-abilityIcon">
			<img src={ image } />
		</div>
	)
}

const StatCollection = ({ paths, stats }) => {
	return  (
		<div className="heroStats-statCollection">
			{
				paths.map( _path  => {
					let stat = getStatFromPath( stats, _path );
					if ( !stat ) {
						return null;
					}
					return <HeroStat key={ stat.name } stat={stat} />
				})
			}
		</div>
	)
}

const HeroStat = ({ stat }) => {
	return (
		<div className="heroStats-stat">
			<span className="heroStats-stat-name">{ stat.name }</span>
			<span className="heroStats-stat-value">{ stat.value }</span>
		</div>
	)
}

const HeroStatProgress = ({ value, total }) => {
	return (
		<div className="heroStats-statProgress">
			<div className="heroStats-statProgress-inner"></div>
		</div>
	)
}

function getStatFromPath ( stats, path ) {
	let segments = path.split('.');
	let stat = stats[ segments.shift() ];
	segments.forEach( ( seg ) => { stat = stat[ seg ] });
	return stat;
}