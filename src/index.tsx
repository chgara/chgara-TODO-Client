import 'react-app-polyfill/ie9';
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import React from 'react';
import ReactDOM from 'react-dom';
import Main from './Main';
import './styles/main.scss';
import * as serviceWorker from './serviceWorker';

if (process.env.SSR) {
	console.log("SSR");
	ReactDOM.hydrate(
		<React.StrictMode>
			<Main />
		</React.StrictMode>,
		document.getElementById('root'),
	);
} else {
	console.log("CSR");
	ReactDOM.render(
		<React.StrictMode>
			<Main />
		</React.StrictMode>,
		document.getElementById('root'),
	);
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
