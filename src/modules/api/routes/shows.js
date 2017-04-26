import Joi from 'joi';
import { API_BASE_URL } from '../constants';
import {
    getShows,
    updateShow,
    upsertShow,
    removeShow
} from '../../../models/shows';

const showRoutes = [
    {
        path: `${API_BASE_URL}/shows/{id?}`,
        method: 'GET',
        config: {
            validate: {
                query: {
                    isActive: Joi.boolean(),
                    users: Joi.string()
                }
            },
            auth: {
                strategy: 'jwt',
                scope: ['admin', 'dj'],
                mode: 'optional'
            },
            handler: getShows
        }
    },
    // create a show
    {
        path: `${API_BASE_URL}/shows`,
        method: 'POST',
        config: {
            auth: {
                strategy: 'jwt',
                scope: ['admin']
            },
            handler: upsertShow
        }
    },
    // update a show
    {
        path: `${API_BASE_URL}/shows`,
        method: 'PUT',
        config: {
            auth: {
                strategy: 'jwt',
                scope: ['admin']
            },
            handler: updateShow
        }
    },
    // Delete a show
    {
        path: `${API_BASE_URL}/shows`,
        method: 'DELETE',
        config: {
            auth: {
                strategy: 'jwt',
                scope: ['admin']
            },
            handler: removeShow
        }
    }
];

export default showRoutes;
