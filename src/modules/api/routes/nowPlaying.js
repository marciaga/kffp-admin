import { API_BASE_URL } from '../constants';
import { updateNowPlaying, getNowPlaying } from '../../../models/nowPlaying';

const nowPlayingRoutes = [
    {
        path: `${API_BASE_URL}/now-playing`,
        method: 'PUT',
        config: {
            auth: {
                strategy: 'jwt',
                scope: ['admin', 'dj']
            },
            handler: updateNowPlaying
        }
    },
    {
        path: `${API_BASE_URL}/now-playing`,
        method: 'GET',
        config: {
            auth: {
                strategy: 'jwt',
                scope: ['admin', 'dj'],
                mode: 'optional'
            },
            handler: getNowPlaying
        }
    }
];

export default nowPlayingRoutes;
