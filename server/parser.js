'use strict'
var cheerio = require('cheerio');


class Parser {
	constructor ( dom ) {
		this.$ = cheerio.load( dom );
		this.scrapeGameType = this.scrapeGameType.bind( this );
	}

	scrapeGameType ( gameType ) {
		let characters = {};
		let chars = this.$(`#${gameType} select[data-group-id="stats"] option`);

		//for each character.....
		for ( var charCount = 0; charCount < chars.length; charCount++) {
			let characterName = chars[ charCount ].attribs['option-id'];
			let characterValue = chars[charCount].attribs.value;
			let characterSelectorString = `#${gameType} *[data-category-id="${characterValue}"] table`;
			let statTables = this.$(characterSelectorString);

			let currentCharacter = {
				name: characterName,
				value: characterValue,
				stats: {}
			};

			//for each stat table....
			for (var statTableCount = 0; statTableCount < statTables.length; statTableCount++) {
				let statHeader = this.$( statTables[statTableCount]).find('thead span').html();
				let innerStatNodes = this.$( statTables[statTableCount]).find('tbody tr' );
				let statCategory = {};
				let isGameCategory = statHeader === 'Game';
				statHeader = statHeader.replace(/-|\s/g, '');

				//for each individual stat....
				for (var statCount = 0; statCount < innerStatNodes.length; statCount++) {
					let statName = this.$( innerStatNodes[statCount]).children().first().html().trim();
					let statValue = this.$( innerStatNodes[statCount]).children().last().html();
					let fixedStatName =  statName.replace(/-|\s/g, '');
					statValue = statValue.replace(/,/g, ''); // remove commas

					if ( isGameCategory ) {
						switch( fixedStatName ) {
							case 'TimePlayed':
								if ( statValue.indexOf('hours') > -1) {
									statValue = (parseFloat( statValue ) * 60);
								}
								else {
									statValue = parseFloat( statValue );
								}
								break;
							case 'ObjectiveTime':
							case 'TimeSpentonFire':
								//save it as a string for these ones..
								break;
							default:
								statValue = parseFloat ( statValue );
								break;
						}
					}
					else {
						statValue = parseFloat ( statValue );
					}

					console.log( `value: ${statValue}, name: ${statName}, character: ${characterName}`);

					statCategory[ encodeURIComponent(fixedStatName) ] = {
						name: statName,
						value: statValue
					}
				}

				currentCharacter.stats[ statHeader ] = statCategory;
			}

			characters[ characterValue ] = currentCharacter;
		}

		return characters;
	}

	scrapePlayerData() {
		let playerData = {};
		//image
		let avatarSelector = '#overview-section .masthead-player img';
		let avatarSrc = this.$( avatarSelector ).attr('src');
		//comp score
		let compScoreSelector = `.competitive-rank div`;
		let compScore = parseInt( this.$( compScoreSelector ).html() );

		if ( isNaN(compScore) ) {
			compScore = 0;
		}


		playerData.avatarUrl = avatarSrc;
		playerData.SR = compScore;

		return playerData;
	}

	parse ( ) {
		let quickplayStats = this.scrapeGameType( 'quickplay' );
		let compStats = this.scrapeGameType('competitive');
		let playerInfo = this.scrapePlayerData();
		return {
			quickPlayStats: quickplayStats,
			compStats: compStats,
			playerInfo: playerInfo
		}
	}
}
module.exports = Parser;