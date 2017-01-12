import {
	CLEAR_PLAYER,
	SELECT_CHARACTER,
	PLAYER_SEARCH_SUCCESS } from './../actions';


const initialState = {
	keys: [],
	byKey: {},
	mostPlayed: null
}

export default function characters ( state = initialState, action ) {
	switch ( action.type ) {
		case CLEAR_PLAYER:
			return Object.assign({}, initialState.characters );
		case SELECT_CHARACTER:
			return Object.assign({}, state, {
				selected: action.key === state.selected ? null : action.key
			});
		case PLAYER_SEARCH_SUCCESS:
			return Object.assign( {}, state, {
				keys: Object.keys( action.player.compStats ),
				byKey: action.player.compStats,
				mostPlayed: mostPlayedCharacter( action.player.compStats )
			});
		default:
			return state;
	}
}

export function getCharacter (state, id) {
	return state.byKey[id];
}

function mostPlayedCharacter ( charactersByKey  ) {
	let most = Object.keys( charactersByKey ).map( id => charactersByKey[id] )
	.sort( function (a, b) {
		if ( a.stats.Game.TimePlayed.value === b.stats.Game.TimePlayed.value ) {
			return 0;
		}
		if ( a.stats.Game.TimePlayed.value > b.stats.Game.TimePlayed.value ) {
			return -1;
		}
		return 1;
	})[1];
	return most;
}