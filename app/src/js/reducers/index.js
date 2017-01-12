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


import player from './player';
import characters from './characters';

// import { getPluginCategories } from '../../modules/pluginsController/js/pluginsControllerModule';

const initialState = {

	ui: {
		title: 'GopherWatch',
		selectedCharacter: null
	}
}

function ui (state = initialState.ui, action ) {
	switch( action.type ) {
		case CLEAR_PLAYER:
			return Object.assign({}, initialState.ui );
		case PLAYER_SEARCH_ADDED_TO_QUEUE:
		case GETTING_PLAYER:
			return {
				title: 'Getting ' + action.name,
			};
		case PLAYER_SEARCH_SUCCESS:
		case GET_PLAYER_SUCCESS:
			return {
				title: 'test',
			};
		case INIT_APP:
			return { title: 'GopherWatch' };
		default:
			return state;
	}
}


const GopherWatch = combineReducers({
	ui,
	characters,
	player
})

export default GopherWatch;
