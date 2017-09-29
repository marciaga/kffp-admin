import { API_BASE_URL } from '../constants';
import { updateNowPlaying, getNowPlaying } from '../../../models/nowPlaying';

const nowPlayingRoutes = [
    {
        path: `${API_BASE_URL}/now-playing`,
        method: 'PUT',
        config: {
            auth: {
                strategy: 'jwt',
                scope: ['admin', 'dj', 'reports']
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
                scope: ['admin', 'dj', 'reports'],
                mode: 'optional'
            },
            handler: getNowPlaying
        }
    }
];

export default nowPlayingRoutes;
