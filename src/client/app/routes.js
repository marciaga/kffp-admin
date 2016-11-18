import React from 'react';
import { Route } from 'react-router';
import App from './components/index';

export const routes = {
    path: '/',
    component: App,
    childRoutes: [
        { path: 'playlist', component: App },
        { path: 'playlist/:id', component: App }
    ]
};
