/* Can use import as we are running all our code through webpack to convert to ES5 */
import 'babel-polyfill'; // so we can use async - await
import express from 'express';
import { matchRoutes } from 'react-router-config';
import proxy from 'express-http-proxy';
import Routes from './client/Routes';
import renderer from './helpers/renderer';
import createStore from './helpers/createStore';

const app = express();

// Any route that tries to access '/api' will be sent off to this domain.
// The second parameter object for the proxy function is only needed for this course api
app.use(
	'/api', 
	proxy('http://react-ssr-api.herokuapp.com', {
		proxyReqOptDecorator(opts) {
			opts.headers['x-forwarded-host'] = 'localhost:3000';
			return opts;
		}
	})
);

app.use(express.static('public'));
// Use a catch all route in Express
// React Router will handle app routing.
app.get('*', (req,res) => {

	// Pass in the req so we can get use any cookies for authentication.
	const store = createStore(req);

	// Some logic to initialise and load data into the store.

	// Work out which components will be used (based on the URL) and what data they will need
	// So we can load the data into the store before we render the components
	const promises = matchRoutes(Routes, req.path).map(({ route }) => {
		return route.loadData ? route.loadData(store) : null;
	});

	// When all our data has loaded we can render the components
	Promise.all(promises).then(() => {
		// Pass req to renderer - as the Static Router (SSR) needs to know the 
		// URL being requested.
		res.send(renderer(req, store));
	});


	
});

app.listen(3000, () => {
	console.log('Listening on port 3000');
});