import { getPlaylistsByShow, createPlaylist } from '../../../models/playlist';

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
    }
];

export default playlistRoutes;
