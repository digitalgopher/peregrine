import axios from 'axios';



export const INIT_APP = 'INIT_APP';
export function initApp () {
	return {
		type: INIT_APP
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