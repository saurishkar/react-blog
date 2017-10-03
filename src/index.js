import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Route, Switch, BrowserRouter, IndexRoute } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';


import reducers from './reducers/index';
import App from './components/app';
import Create from './components/admin/create';
import Index from './components/admin/index';
import About from './components/admin/about';
import './assets/css/style.css';

const createStoreWithMiddleware = applyMiddleware()(createStore);

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