import {
	CLEAR_PLAYER,
	PLAYER_SEARCH_SUCCESS } from './../actions';


const initialState = {
	name: null,
	info: null,
	generalStats: null
};

export default function player ( state = initialState, action ) {
	switch (action.type ) {
		case CLEAR_PLAYER:
			return {};
		case PLAYER_SEARCH_SUCCESS:
			return Object.assign( {}, state, {
				name: action.name,
				info: action.player.playerInfo,
				generalStats: action.player.compStats['0x02E00000FFFFFFFF'].stats
			});
		default:
			return state;
	}
}
