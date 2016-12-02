import React from 'react';
import { Route } from 'react-router';
import App from './components/index';
import UserContainer from './components/users';

export default (
    <Route>
        <Route component={App} path='/'>
            <Route component={UserContainer} path="/users" />
        </Route>
    </Route>
);
