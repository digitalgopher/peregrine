//react / redux
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';

import  GopherWatch  from './reducers'
import { getSurvey, initApp } from './actions'

import App from './containers/App';



// window.Authoring = {};

// window.Authoring.init = function () {
	const logger = store => next => action => {
		console.groupCollapsed( action.type );
		console.log( `action fired!: action: ${action.type}` );
		console.dir( action );
		console.dir( store.getState() );
		console.groupEnd();
		next( action );
	}

	const middleWare = applyMiddleware( logger, thunk );
	let store = createStore(GopherWatch, middleWare )

	render(
		<Provider store={store}>
			<App> </App>
		</Provider>,
		document.getElementById('root')
	);
// }


