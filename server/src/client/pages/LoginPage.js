import React from 'react';
import { Link } from 'react-router-dom';

export default () => {
	return (
		<div>
			<Link to="/" className="brand-logo">React SSR</Link>
			<h1>LOGIN</h1>
		</div>
	);
};