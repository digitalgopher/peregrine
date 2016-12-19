import axios from 'axios';

import {firebaseModule} from './../modules/firebase';

export const INIT_APP = 'INIT_APP';
export function initApp () {
	return function (dispatch) {
		firebaseModule.init();
	}
	return {
		type: INIT_APP
	}
}

export const GETTING_PLAYER = 'GETTING_PLAYER';
export function gettingPlayer (name) {
	return function (dispatch) {
		dispatch( initFirebase() );
	
	}
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

export const SEARCH_PLAYER = 'SEARCH_PLAYER';
export function searchPlayer (name) {
	return function (dispatch) {
		return firebaseModule.searchPlayer( name ).then( function (data) {
			dispatch( playerSearchAddedToQueue (data) );
			firebaseModule.watchPlayer( name, function ( player ) {
				dispatch( playerSearchSuccess(player, name ) );
			});
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
		type: PLAYER_SEARCH_ADDED_TO_QUEUE
	}
}