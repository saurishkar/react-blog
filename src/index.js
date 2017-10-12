import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { logger } from 'redux-logger';
import { CookiesProvider } from 'react-cookie';


import reducers from './reducers/index';
import App from './components/app';
import './assets/css/style.css';

const createStoreWithMiddleware = applyMiddleware(ReduxThunk, logger)(createStore);

ReactDOM.render(
	<Provider store={createStoreWithMiddleware(reducers)}>
		<BrowserRouter>
			<CookiesProvider>
				<div>
					<Switch>
						<Route exact path="/" component={App} />
					</Switch>	
				</div>
			</CookiesProvider>
		</BrowserRouter>
	</Provider>
	,document.querySelector('.container'));