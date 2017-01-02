import {
    getPlaylistsByShow,
    createPlaylist,
    addTrack
} from '../../../models/playlist';

const playlistRoutes = [
    {
        path: '/api/playlists/{slug}',
        method: 'GET',
        config: {
            validate: {
                //
            },
            auth: {
                strategy: 'jwt',
                scope: ['admin', 'dj']
            },
            handler: getPlaylistsByShow
        }
    },
    {
        path: '/api/playlists',
        method: 'POST',
        config: {
            auth: {
                strategy: 'jwt',
                scope: ['admin', 'dj']
            },
            handler: createPlaylist
        }
    },
    {
        path: '/api/playlist/{playlistId}',
        method: 'PUT',
        config: {
            auth: {
                strategy: 'jwt',
                scope: ['admin', 'dj']
            },
            handler: addTrack
        }
    }
];

export default playlistRoutes;
