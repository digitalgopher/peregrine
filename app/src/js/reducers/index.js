import { combineReducers } from 'redux'
import {
	INIT_APP,
	GET_PLAYER,
	GET_PLAYER_SUCCESS,
	GETTING_PLAYER,
	SEARCH_PLAYER,
	PLAYER_SEARCH_SUCCESS
	 } from './../actions';


// import { getPluginCategories } from '../../modules/pluginsController/js/pluginsControllerModule';

const initialState = {
	app: {
		searchedPlayer: null,
	},
	ui: {
		title: 'GopherWatch',
		player: null
	}
}

function app ( state = initialState.app, action ) {
	switch (action.type) {
		case SEARCH_PLAYER:
			return Object.assign( {}, app, { 
				searchedPlayer: action.name
			});
		default:
			return state;
	}
}

function ui (state = initialState.ui, action ) {
	switch( action.type ) {
		case GET_PLAYER_SUCCESS: 
			return Object.assign( {}, state, {
				player: action.player
			});
		case GET_PLAYER:
			return state;
		case GETTING_PLAYER:
			return {
				title: 'Getting ' + action.name,
				player: null,
			};
		case GET_PLAYER_SUCCESS:
			return {
				title: 'Stats for ' + action.name,
				player: action.data
			};
		case INIT_APP:
			return { title: 'GopherWatch' };
		default:
			return state;
	}
}


const GopherWatch = combineReducers({
	ui, app
})

export default GopherWatch;
