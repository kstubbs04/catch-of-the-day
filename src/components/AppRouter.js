import React from 'react';
import {BrowserRouter, Match, Miss} from 'react-router';
import App from './App';
import StorePicker from './StorePicker';
import NotFound from './NotFound';

function AppRouter(props){
	return (
			<BrowserRouter>
				<div>
					<Match exactly pattern="/" component={StorePicker} />
					<Match pattern="/store/:storeId" component={App} />
					<Miss component={NotFound}></Miss>
				</div>
			</BrowserRouter>
	)
}

export default AppRouter;