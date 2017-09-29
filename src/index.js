import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';


import reducers from './reducers/index';
import App from './components/app';
import Create from './components/admin/create';

const createStoreWithMiddleware = applyMiddleware()(createStore);

ReactDOM.render(
	<Provider store={createStoreWithMiddleware(reducers)}>
		<BrowserRouter>
			<Switch>
				<Route path="/" component={App} />
				<Route path="/admin/create" component={Create}/>
			</Switch>
		</BrowserRouter>
	</Provider>
	,document.querySelector('.container'));