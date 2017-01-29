const updateNowPlaying = async (request, reply) => {
    const { playlistId, song, playedAt } = request.payload;
    const { id, ...songData } = song;
    const nowPlayingData = {
        ...songData,
        playedAt,
        songId: song.id
    };

    try {
        const { db, ObjectID } = request.server.plugins['hapi-mongodb'];
        const { socket } = request.server.plugins['web-sockets'];

        socket.emit('now-playing', songData);

        const result = await db.collection('nowPlaying').findOneAndReplace({},
            nowPlayingData,
            {
                upsert: true,
                returnNewDocument: true
            }
        );

        const pid = new ObjectID(playlistId);
        const res = await db.collection('playlists').update(
            { _id: pid, 'songs.id': song.id },
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
    }
};

export default updateNowPlaying;
