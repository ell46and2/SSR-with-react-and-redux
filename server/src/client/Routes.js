import React from 'react';
import App from './App';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import UsersListPage from './pages/UsersListPage';
import AdminsListPage from './pages/AdminsListPage';
import NotFoundPage from './pages/NotFoundPage';

// export default () => {
// 	return (
// 		<div>
// 			<Route exact path="/" component={Home} />
// 			<Route path="/users" component={UsersList} />
// 		</div>
// 	);
// };

// Have to return in this format (instead of like above) for SSR with react-router-config
export default [
	{
		component: LoginPage,
		path: '/loginpage',
	},
	{
		...App,
		routes: [
			{
				...HomePage, // Gives us - component: HomePage
				path: '/',
				exact: true
			},
			{
				...UsersListPage, // gives us - component: UsersListPage, loadData: loadData
				path: '/users',
			},
			{
				...AdminsListPage, // gives us - component: AdminsListPage, loadData: loadData
				path: '/admins',
			},
			{
				...NotFoundPage
			}
		]
	}
];