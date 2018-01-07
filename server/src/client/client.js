// Startup point for the client side application
import 'babel-polyfill'; // so we can use async - await
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import axios from 'axios';
import Routes from './Routes';
import reducers from './reducers';

// Create an axios instance so we can attach our authentication browser request cookie
// to it. So we can get if we are authenticated from the browser and pass the cookie to the api.
const axiosInstance = axios.create({
	baseURL: './api'
});


// Pass store in to window.INITIAL_STATE, so that the data we load on the server
// is available in the client. Otherwise our components would rerender client side with a blank state.
const store = createStore(
	reducers,
	window.INITIAL_STATE,
	applyMiddleware(thunk.withExtraArgument(axiosInstance))
);


ReactDOM.hydrate(
	<Provider store={store}>
		<BrowserRouter>
			<div>{ renderRoutes(Routes) }</div>
		</BrowserRouter>
	</Provider>,
	document.querySelector('#root')
);