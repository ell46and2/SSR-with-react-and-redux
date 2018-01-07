import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import serialize from 'serialize-javascript';
import Routes from '../client/Routes';

export default (req, store) => { // Receives req paramter from our express route in index.js
	const content = renderToString(
		<Provider store={store}>
			<StaticRouter location={req.path} context={{}}>
				<div>{ renderRoutes(Routes) }</div>
			</StaticRouter>
		</Provider>
	);

	// Pass store in to window.INITIAL_STATE, so that the data we load on the server
	// is available in the client. Otherwise our components would rerender client side with a blank state.
	// serialize will escape HTML charaters and JavaScript line terminators - so we can avoid any potential XSS attacks coming from the server. - i.e name: </script><script>alert('XSS attack');</script>
	return `
		<html>
			<head>
				<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.2/css/materialize.min.css">
			<head>
			<body>
				<div id="root">${content}</div>
				<script>
					window.INITIAL_STATE = ${serialize(store.getState())}
				</script>
				<script src="bundle.js"></script>
			</body>
		</html>
	`;
};