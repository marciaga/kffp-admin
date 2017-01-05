import React from 'react';
import { Route } from 'react-router';
import App from './components/index';
import Users from './components/users';
import Playlist from './components/playlist';
import Shows from './components/shows';

export default (
    <Route>
        <Route component={App} path='/'>
            <Route component={Users} path="/users" />
            <Route component={Playlist} path="/playlists" />
            <Route component={Shows} path="/shows" />
        </Route>
    </Route>
);
