import { combineReducers } from 'redux'
import {
	INIT_APP,
	GET_PLAYER,
	GET_PLAYER_SUCCESS,
	GETTING_PLAYER,
	CLEAR_PLAYER,
	SEARCH_PLAYER,
	PLAYER_SEARCH_SUCCESS,
	PLAYER_SEARCH_ADDED_TO_QUEUE,
	SELECT_CHARACTER
	 } from './../actions';


// import { getPluginCategories } from '../../modules/pluginsController/js/pluginsControllerModule';

const initialState = {
	app: {
		searchedPlayer: null,
	},
	ui: {
		title: 'GopherWatch',
		player: null,
		selectedCharacter: null
	},
	player: {
		name: null,
		info: null
	},
	characters: {
		keys: null,
		byKey: null,
		selected: null
	}
}

function player ( state = initialState.player, action ) {
	switch (action.type ) {
		case CLEAR_PLAYER: 
			return Object.assign({}, initialState.player );
		case PLAYER_SEARCH_SUCCESS:
			return Object.assign( {}, state, {
				name: action.name,
				info: action.player.playerInfo
			});
		default:
			return state;
	}
}

function characters ( state = initialState.characters, action ) {
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
				byKey: action.player.compStats
			});
		default:
			return state;
	}
}

function app ( state = initialState.app, action ) {
	switch (action.type) {
		case SEARCH_PLAYER:
			return Object.assign( {}, state, { 
				searchedPlayer: action.name
			});
		case PLAYER_SEARCH_SUCCESS:
			return Object.assign( {}, state, {

			});
		default:
			return state;
	}
}

function ui (state = initialState.ui, action ) {
	switch( action.type ) {
		case CLEAR_PLAYER: 
			return Object.assign({}, initialState.ui );
		case GET_PLAYER_SUCCESS: 
			return Object.assign( {}, state, {
				player: action.player
			});
		case GET_PLAYER:
			return state;
		case SELECT_CHARACTER:
			return Object.assign({}, state, {
				selectedCharacter: action.key === state.selectedCharacter ? null : action.key
			})
		case PLAYER_SEARCH_ADDED_TO_QUEUE:
		case GETTING_PLAYER:
			return {
				title: 'Getting ' + action.name,
				player: null,
			};
		case PLAYER_SEARCH_SUCCESS:
		case GET_PLAYER_SUCCESS:
			return {
				title: 'Stats for ' + action.name,
				player: action.player
			};
		case INIT_APP:
			return { title: 'GopherWatch' };
		default:
			return state;
	}
}


const GopherWatch = combineReducers({
	ui, app, characters, player
})

export default GopherWatch;
