import R from 'ramda';
import Boom from 'boom';

const getReport = async (request, reply) => {
    const { db } = request.server.plugins.mongodb;
    const { startDate, endDate } = request.query;

    try {
        const result = await db.collection('playlists').find({
            playlistDate: {
                $gte: new Date(startDate),
                $lte: new Date(endDate)
            }
        })
        .sort({ playlistDate: 1 })
        .toArray();

        const setProps = arr => arr.map((obj) => {
            const { artist, title, album, label, releaseDate } = obj;

            return {
                artist,
                title,
                album,
                label,
                releaseDate
            };
        });

        const composeSongs = R.compose(
            setProps,
            R.flatten,
            R.map(s => s.songs)
        );

        const res = composeSongs(result);

        return reply(res);
    } catch (err) {
        console.log(err);
        return reply(Boom.internal('Failed to generate playlist report.'));
    }
};

export default getReport;
