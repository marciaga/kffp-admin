import { API_BASE_URL } from '../constants';
import {
    getPlaylistsByShow,
    createPlaylist,
    addTrack,
    updateTracks,
    updateTrackOrder,
    updatePlaylistField,
    deleteTrackFromPlaylist,
    deletePlaylist
} from '../../../models/playlist';


const playlistRoutes = [
    {
        path: `${API_BASE_URL}/playlists/{slug}/{playlistId?}`,
        method: 'GET',
        config: {
            validate: {
                //
            },
            auth: {
                strategy: 'jwt',
                scope: ['admin', 'dj'],
                mode: 'optional'
            },
            handler: getPlaylistsByShow
        }
    },
    {
        path: `${API_BASE_URL}/playlists`,
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
        path: `${API_BASE_URL}/playlists/{playlistId}`,
        method: 'PUT',
        config: {
            auth: {
                strategy: 'jwt',
                scope: ['admin', 'dj']
            },
            handler: addTrack
        }
    },
    {
        path: `${API_BASE_URL}/playlists/{playlistId}`,
        method: 'PATCH',
        config: {
            auth: {
                strategy: 'jwt',
                scope: ['admin', 'dj']
            },
            handler: updatePlaylistField
        }
    },
    {
        path: `${API_BASE_URL}/playlists/{playlistId}`,
        method: 'DELETE',
        config: {
            auth: {
                strategy: 'jwt',
                scope: ['admin']
            },
            handler: deletePlaylist
        }
    },
    {
        path: `${API_BASE_URL}/playlists/{playlistId}/tracks`,
        method: 'PATCH',
        config: {
            auth: {
                strategy: 'jwt',
                scope: ['admin', 'dj']
            },
            handler: updateTracks
        }
    },
    {
        path: `${API_BASE_URL}/playlists/{playlistId}/tracks`,
        method: 'PUT',
        config: {
            auth: {
                strategy: 'jwt',
                scope: ['admin', 'dj']
            },
            handler: updateTrackOrder
        }
    },
    {
        path: `${API_BASE_URL}/playlists/{playlistId}/tracks/{trackId}`,
        method: 'DELETE',
        config: {
            auth: {
                strategy: 'jwt',
                scope: ['admin', 'dj']
            },
            handler: deleteTrackFromPlaylist
        }
    }
];

export default playlistRoutes;
