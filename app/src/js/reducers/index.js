import { combineReducers } from 'redux'
// import { ADD_TODO, TOGGLE_TODO, SET_VISIBILITY_FILTER, VisibilityFilters } from './actions'
import {
// 	COOL_ACTION,
// 	ADD_ITEM,
// 	DELETE_ITEM,
// 	UPDATE_TITLE,
// 	REMOVE_ITEM,
// 	INIT_SURVEY,
// 	GET_SURVEY_STARTED,
// 	UPDATE_PROPERTY_STARTED,
	INIT_APP,
	GET_PLAYER,
	GET_PLAYER_SUCCESS,
	GETTING_PLAYER
	 } from './../actions';
// // const { SHOW_ALL } = VisibilityFilters


// import { getPluginCategories } from '../../modules/pluginsController/js/pluginsControllerModule';

const initialState = {

	ui: {
		title: '',
		player: null
	}

}

function ui (state = initialState.ui, action ) {
	switch( action.type ) {
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
	ui
})

export default GopherWatch;
