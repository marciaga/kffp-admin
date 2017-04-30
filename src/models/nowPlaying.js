import Boom from 'boom';

const getNowPlaying = async (request, reply) => {
    const { db } = request.server.plugins.mongodb;

    try {
        const result = await db.collection('nowPlaying').findOne();

        if (!result) {
            return reply({ success: false, message: 'Nothing is playing' });
        }

        return reply(result);
    } catch (e) {
        console.log(e);
        return reply(Boom.serverUnavailable());
    }
};

const updateNowPlaying = async (request, reply) => {
    const { playlistId, song, playedAt } = request.payload;

    try {
        const { db, ObjectID } = request.server.plugins.mongodb;
        const { socket } = request.server.plugins['web-sockets'];
        const { id, ...songData } = song;
        const nowPlayingData = {
            ...songData,
            playedAt,
            songId: new ObjectID(song.id)
        };

        socket.emit('now-playing', songData);

        const result = await db.collection('nowPlaying').findOneAndReplace({},
            nowPlayingData,
            {
                upsert: true,
                returnNewDocument: true
            }
        );

        const pid = playlistId;

        const res = await db.collection('playlists').update(
            { playlistId: pid, 'songs.id': nowPlayingData.songId },
            { $set: { 'songs.$.playedAt': playedAt } }
        );
        const playlistResult = res.toJSON();
        const { ok, nModified } = playlistResult;

        if (result.ok && ok && nModified) {
            return reply({
                success: true,
                value: nowPlayingData
            });
        }

        return reply({ success: false, message: 'Could not set as Now Playing' });
    } catch (e) {
        console.log(e);
        return reply(Boom.internal('Something went wrong'));
    }
};

export { updateNowPlaying, getNowPlaying };
