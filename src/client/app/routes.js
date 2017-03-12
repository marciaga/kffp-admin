import React from 'react';
import { Route, Switch } from 'react-router-dom';
import App from './components/index';
import Users from './components/users';
import Playlist from './components/playlist';
import PlaylistForm from './components/playlist/playlistForm';
import Shows from './components/shows';
import Main from './components/main';
import Settings from './components/settings';
import FourZeroFour from './components/error/404';

const AppRoutes = () => (
    <Switch>
        <Route component={App} exact path="/" />
        <Route component={Users} path="/users" />
        <Route component={Playlist} path="/playlists/:slug">
            <Route component={PlaylistForm} path="/playlists/:slug/:id" />
        </Route>
        <Route component={Playlist} path="/playlists/edit/:slug" />
        <Route component={Shows} path="/shows" />
        <Route component={Settings} path="/settings" />
    </Switch>
);

export default AppRoutes;
