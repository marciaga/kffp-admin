import Joi from 'joi';
import Boom from 'boom';
import moment from 'moment';
import cuid from 'cuid';
import shortid from 'shortid';

const songSchema = {
    id: Joi.string(),
    title: Joi.string().required(),
    artist: Joi.string().required(),
    album: Joi.string(),
    releaseYear: Joi.string(),
    playedAt: Joi.date().iso()
};

const playlistSchema = Joi.object().keys({
    _id: Joi.string(),
    showId: Joi.string().required(),
    playlistDate: Joi.date().iso().required(),
    playlistId: Joi.string().required(),
    songs: Joi.array().items(Joi.object(songSchema))
});

const getPlaylists = async (db, show) => {
    const showId = show._id.toString();

    try {
        const result = await db.collection('playlists').find({
            showId
        })
        .toArray();

        return result;
    } catch (e) {
        console.log(e);
    }
};

const getShow = async (db, slug) => (
    await db.collection('shows').findOne({
        slug
    })
);

// TODO this needs to be limited so we don't fetch everything at once
const getPlaylistsByShow = async (request, reply) => {
    const { db } = request.server.plugins.mongodb;
    // playlistId is sometimes available on request.params
    const { slug } = request.params;

    try {
        const show = await getShow(db, slug);
        const playlists = await getPlaylists(db, show);
        const mergedData = {
            playlists,
            show
        };

        return reply(mergedData);
    } catch (err) {
        console.log(err);
        return err;
    }
};

const createPlaylist = async (request, reply) => {
    const { db } = request.server.plugins.mongodb;
    const now = moment();
    const playlistDate = now.toISOString();
    const playlistId = shortid.generate();
    const { showId } = request.payload;

    const newPlaylist = {
        showId,
        playlistDate,
        playlistId,
        songs: []
    };

    try {
        const result = await db.collection('playlists').find({
            playlistId,
            showId
        }).toArray();

        if (result.length) {
            const msg = {
                code: 401,
                message: 'That playlist already exists'
            };

            return reply(msg);
        }

        try {
            Joi.validate(newPlaylist, playlistSchema, (err, value) => {
                if (err) {
                    console.log(err);
                    throw Boom.badRequest(err);
                }
                // if value === null, object is valid
                if (value === null) {
                    return true;
                }
            });
        } catch (err) {
            return reply(err);
        }

        db.collection('playlists').insert(newPlaylist, (err, doc) => {
            if (err) {
                return reply(Boom.internal('Internal MongoDB error', err));
            }

            const { ops } = doc;
            const newDoc = ops.find((o, i) => (
                i === 0
            ));

            return reply(newDoc);
        });
    } catch (err) {
        console.log(err);
        return reply(err);
    }
};

const addTrack = async (request, reply) => {
    const { db, ObjectID } = request.server.plugins.mongodb;

    try {
        const track = request.payload;
        const { playlistId } = request.params;
        const id = new ObjectID(playlistId);

        track.id = cuid();

        const result = await db.collection('playlists').update(
            { _id: id },
            {
                $push: {
                    songs: {
                        $each: [track],
                        $position: 0
                    }
                }
            }
        );

        const response = result.toJSON();
        const { ok, nModified } = response;

        if (ok && nModified) {
            return reply({
                success: true,
                track
            });
        }

        return reply({ success: false, message: 'Update was not successful' });
    } catch (err) {
        console.log(err);
        return reply(err);
    }
};

const updateTracks = async (request, reply) => {
    const { db, ObjectID } = request.server.plugins.mongodb;

    try {
        const track = request.payload;
        const { playlistId } = request.params;
        const result = await db.collection('playlists').update(
            { _id: ObjectID(playlistId), 'songs.id': track.id },
            { $set: { 'songs.$': track } }
        );

        const response = result.toJSON();
        const { ok, nModified, n } = response;

        if (ok && nModified) {
            return reply({ success: true, message: 'Song updated' });
        }

        if (ok && n) {
            return reply({ success: false, message: 'Document was unchanged' });
        }

        return reply({ success: false, message: 'Update was not successful' });
    } catch (err) {
        console.log(err);
        return reply(err);
    }
};

const updateTrackOrder = async (request, reply) => {
    const { db, ObjectID } = request.server.plugins.mongodb;

    try {
        const payload = request.payload;
        // don't save any airbreaks
        const tracks = payload.filter(o => !o.airBreak);
        const { playlistId } = request.params;
        const id = new ObjectID(playlistId);

        const result = await db.collection('playlists').update(
            { _id: id },
            { $set: { songs: tracks } }
        );

        const response = result.toJSON();
        const { ok, nModified } = response;

        if (ok && nModified) {
            return reply({ success: true });
        }

        return reply({ success: false, message: 'Update was not successful' });
    } catch (err) {
        console.log(err);
        return reply(err);
    }
};

const deleteTrackFromPlaylist = async (request, reply) => {
    const { db, ObjectID } = request.server.plugins.mongodb;

    try {
        const { playlistId, trackId } = request.params;
        const pid = new ObjectID(playlistId);

        const result = await db.collection('playlists').update(
            { _id: pid }, { $pull: { songs: { id: trackId } } });

        const response = result.toJSON();
        // { ok: 1, nModified: 1, n: 1 }
        const { ok, nModified } = response;

        if (ok && nModified) {
            return reply({ success: true });
        }

        return reply({ success: false, message: 'Update was not successful' });
    } catch (err) {
        console.log(err);
        return reply(err);
    }
};

export {
    getPlaylistsByShow,
    createPlaylist,
    addTrack,
    updateTracks,
    updateTrackOrder,
    deleteTrackFromPlaylist
};
