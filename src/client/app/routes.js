import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components';
import Users from './components/users';
import Playlist from './components/playlist';
import Shows from './components/shows';
import Main from './components/main';
import Dashboard from './components/main/dashboard';
import Settings from './components/settings';
import Reports from './components/reports';
import VolunteerForm from './components/volunteer/form';
import Products from './components/products';
import NotFound from './components/error/404';
import PasswordResetForm from './components/auth/password-reset';

export default (
    <Route>
        <Route component={App} path="/">
            <IndexRoute component={Main} />
            <Route component={PasswordResetForm} path="/reset-password" />
            <Route component={Dashboard} path="/dashboard" />
            <Route component={Users} path="/users" />
            <Route component={Playlist} path="/playlists/:slug" />
            <Route component={Playlist} path="/playlists/:slug/:playlistId" />
            <Route component={Shows} path="/shows" />
            <Route component={Settings} path="/settings" />
            <Route component={Reports} path="/reports" />
            <Route component={Products} path="/products" />
            <Route component={VolunteerForm} path="/volunteers/entry" />
            <Route component={NotFound} path="*" />
        </Route>
    </Route>
);
