import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components';
import Users from './components/users';
import Playlist from './components/playlist';
import Shows from './components/shows';
import Main from './components/main';
import Settings from './components/settings';
import NotFound from './components/error/404';

export default (
    <Route>
        <Route component={App} path="/">
            <IndexRoute component={Main} />
            <Route component={Users} path="/users" />
            <Route component={Playlist} path="/playlists/:slug" />
            <Route component={Playlist} path="/playlists/:slug/:playlistId" />
            <Route component={Shows} path="/shows" />
            <Route component={Settings} path="/settings" />
            <Route component={NotFound} path="*" />
        </Route>
    </Route>
);
