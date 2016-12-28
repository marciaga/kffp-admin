import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/index';
import Users from './components/users';
import Playlist from './components/playlist';
import Shows from './components/shows';
import Main from './components/main';

export default (
    <Route>
        <Route component={App} path='/'>
            <IndexRoute component={Main} />
            <Route component={Users} path='/users' />
            <Route component={Playlist} path='/playlists'>
                <Route component={Playlist} path='/playlists/:slug' />
            </Route>
            <Route component={Shows} path='/shows' />
        </Route>
    </Route>
);
