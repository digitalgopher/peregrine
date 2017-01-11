import axios from 'axios';

import {firebaseModule} from './../modules/firebase';

export const CLEAR_PLAYER = 'CLEAR_PLAYER';
export function clearPlayer () {
	return {
		type: CLEAR_PLAYER
	}
}


export const INIT_APP = 'INIT_APP';
export function initApp () {
	return function (dispatch) {
		firebaseModule.init();
	}
}

export const GETTING_PLAYER = 'GETTING_PLAYER';
export function gettingPlayer (name) {
	return {
		type: GETTING_PLAYER,
		name: name
	}
}

export const GET_PLAYER_SUCCESS = 'GET_PLAYER_SUCCESS'
export function getPlayerSuccess (data, playerName) {
	return {
		type: GET_PLAYER_SUCCESS,
		data: data,
		name: playerName
	}
}

export const GET_PLAYER = 'GET_PLAYER';
export function getPlayer ( name ) {
	return function (dispatch) {
		dispatch( gettingPlayer( name ) );

		let data = {
			params: {
				name: name
			}
		};

		return axios.get('/api/v1/gopher', data).then( function (response) {
			dispatch( getPlayerSuccess( response.data, name ));
		});
	}
}

export const UPDATE_PLAYER_SUCCESS = 'UPDATE_PLAYER_SUCCESS';
export function updatePlayerSuccess( data ) {
	return {
		type: UPDATE_PLAYER_SUCCESS,
		data: data
	}
}

export const UPDATE_PLAYER = 'UPDATE_PLAYER';
export function updatePlayer (name) {
	return dispatch => {
		return firebaseModule.searchPlayer( name ).then( data => {
			dispatch(updatePlayerSuccess( data ));
		});
	}
}

export const SEARCH_PLAYER = 'SEARCH_PLAYER';
export function searchPlayer (name) {
	return dispatch => {
		dispatch( gettingPlayer( name ));
		return firebaseModule.getPlayer( name ).then( data => {
			dispatch( playerSearchSuccess( data, name ));
		});
	}
}

export const PLAYER_SEARCH_SUCCESS = 'PLAYER_SEARCH_SUCCESS';
function playerSearchSuccess ( playerData, name ) {
	return {
		type: PLAYER_SEARCH_SUCCESS,
		player: playerData,
		name: name
	}
}

export const PLAYER_SEARCH_ADDED_TO_QUEUE = 'PLAYER_SEARCH_ADDED_TO_QUEUE'
export function playerSearchAddedToQueue (data) {
	return {
		type: PLAYER_SEARCH_ADDED_TO_QUEUE,
		name: data
	}
}

export const SELECT_CHARACTER = 'SELECT_CHARACTER';
export function selectCharacter (characterValue) {
	return {
		type: SELECT_CHARACTER,
		key: characterValue
	}
}