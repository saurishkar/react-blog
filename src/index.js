import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';


import reducers from './reducers/index';
import App from './components/app';
import Create from './components/admin/create';
import Index from './components/admin/index';

const createStoreWithMiddleware = applyMiddleware()(createStore);

ReactDOM.render(
	<Provider store={createStoreWithMiddleware(reducers)}>
		<BrowserRouter>
			<div>
				<Switch>
					
					<App prefix="/home">
						<Route path="/create" component={Create} />
						<Route path="/admin" component={Index} />
					</App>

				</Switch>	
			</div>
		</BrowserRouter>
	</Provider>
	,document.querySelector('.container'));