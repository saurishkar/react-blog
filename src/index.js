import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Route, Switch, BrowserRouter, IndexRoute } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { logger } from 'redux-logger';


import reducers from './reducers/index';
import App from './components/app';
import './assets/css/style.css';

const createStoreWithMiddleware = applyMiddleware(logger)(createStore);

ReactDOM.render(
	<Provider store={createStoreWithMiddleware(reducers)}>
		<BrowserRouter>
			<div>
				<Switch>
					<Route exact path="/" component={App} />
				</Switch>	
			</div>
		</BrowserRouter>
	</Provider>
	,document.querySelector('.container'));