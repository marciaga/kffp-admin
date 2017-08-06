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

        return reply(result);
    } catch (err) {
        console.log(err);
        return reply(Boom.internal('Failed to generate playlist report.'));
    }
};

export default getReport;
