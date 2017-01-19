import updateNowPlaying from '../../../models/nowPlaying';

const nowPlayingRoutes = [
    {
        path: '/api/now-playing',
        method: 'PUT',
        config: {
            auth: {
                strategy: 'jwt',
                scope: ['admin', 'dj']
            },
            handler: updateNowPlaying
        }
    }
];

export default nowPlayingRoutes;
