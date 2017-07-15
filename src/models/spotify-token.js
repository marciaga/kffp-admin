import Boom from 'boom';
import axios from 'axios';
import querystring from 'querystring';

const SPOTIFY_AUTH_URL = 'https://accounts.spotify.com/api/token';

const getSpotifyToken = async (request, reply) => {
    try {
        // auth request to spotify
        const { data } = await axios.post(SPOTIFY_AUTH_URL,
            querystring.stringify({
                grant_type: 'client_credentials'
            }), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    Authorization: `Basic ${process.env.SPOTIFY_BASE64}`
                }
            });

        const { access_token } = data;

        return reply({
            success: true,
            token: access_token
        });
    } catch (e) {
        console.log(e);
        return reply(Boom.internal('Something went wrong getting a Spotify token'));
    }
};

export default getSpotifyToken;
