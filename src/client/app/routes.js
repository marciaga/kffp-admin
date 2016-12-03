import React from 'react';
import { Route, browserHistory } from 'react-router';
import App from './components/index';
import UserContainer from './components/users';

const authCheck = () => {
    const hasToken = localStorage.getItem('idToken') !== null;

    if (!hasToken) {
        return browserHistory.push('/');
    }
};

export default (
    <Route>
        <Route component={App} path='/'>
            <Route component={UserContainer} path="/users" onEnter={authCheck} />
        </Route>
    </Route>
);
