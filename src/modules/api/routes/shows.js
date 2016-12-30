import Joi from 'joi';
import {
    getShows,
    updateShow,
    upsertShow,
    removeShow
} from '../../../models/shows';

const showRoutes = [
    {
        path: '/api/shows',
        method: 'GET',
        config: {
            validate: {
                query: {
                    isActive: Joi.boolean()
                }
            },
            auth: {
                strategy: 'jwt',
                scope: ['admin']
            },
            handler: getShows
        }
    },
    // create a show
    {
        path: '/api/shows',
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
        path: '/api/shows',
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
        path: '/api/shows',
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
