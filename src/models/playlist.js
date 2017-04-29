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
    label: Joi.string(),
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

const getPlaylists = async (db, show, ObjectID) => {
    const showId = new ObjectID(show._id);

    try {
        const result = await db.collection('playlists').find({
            showId
        })
        .toArray();

        return result;
    } catch (e) {
        console.log(e);
        return false;
    }
};

const getShow = async (db, ObjectID, slug) => {
    try {
        const show = await db.collection('shows').findOne({ slug });

        const objectIds = show.users.map(id => new ObjectID(id));
        const users = await db.collection('users').find({
            _id: { $in: objectIds }
        }, {
            _id: 0,
            displayName: 1
        }).toArray();

        show.users = users.map(user => user.displayName);

        return show;
    } catch (e) {
        console.log(e);
        return {};
    }
};

// TODO this needs to be limited so we don't fetch everything at once
const getPlaylistsByShow = async (request, reply) => {
    const { db, ObjectID } = request.server.plugins.mongodb;
    // playlistId is sometimes available on request.params
    const { slug } = request.params;

    try {
        const show = await getShow(db, ObjectID, slug);

        const playlists = await getPlaylists(db, show, ObjectID);
        const mergedData = {
            playlists,
            show
        };

        return reply(mergedData);
    } catch (err) {
        console.log(err);
        return reply(Boom.internal('Something went wrong'));
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
            const msg = 'That playlist already exists';

            return reply(Boom.unauthorized(msg));
        }

        try {
            Joi.validate(newPlaylist, playlistSchema, (err, value) => {
                if (err) {
                    console.log(err);
                    return reply(Boom.badRequest());
                }
                // if value === null, object is valid
                if (value === null) {
                    return true;
                }
            });
        } catch (err) {
            console.log(err);
            return reply(Boom.interval('Something went wrong'));
        }

        db.collection('playlists').insert(newPlaylist, (err, doc) => {
            if (err) {
                console.log(err);
                return reply(Boom.serverUnavailable());
            }

            const { ops } = doc;
            const newDoc = ops.find((o, i) => (
                i === 0
            ));

            return reply(newDoc).code(201);
        });
    } catch (err) {
        console.log(err);
        return reply(Boom.internal('Something went wrong'));
    }
};

const deletePlaylist = async (request, reply) => {
    const { db } = request.server.plugins.mongodb;
    const { playlistId } = request.params;

    try {
        const result = await db.collection('playlists').deleteOne({
            playlistId
        });
        const response = result.toJSON();
        const { ok } = response;

        if (ok) {
            return reply({ success: true });
        }

        return reply({ success: false, message: 'Playlist delete was not successful' });
    } catch (e) {
        console.log(e);
        return reply(Boom.internal('Something went wrong'));
    }
};

const addTrack = async (request, reply) => {
    const { db } = request.server.plugins.mongodb;

    try {
        const track = request.payload;
        const { playlistId } = request.params;

        track.id = cuid();

        const result = await db.collection('playlists').update(
            { playlistId },
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
        return reply(Boom.internal('Something went wrong'));
    }
};

const updateTracks = async (request, reply) => {
    const { db } = request.server.plugins.mongodb;

    try {
        const track = request.payload;
        const { playlistId } = request.params;
        const result = await db.collection('playlists').update(
            {
                playlistId,
                'songs.id': track.id
            },
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
        return reply(Boom.internal('Something went wrong'));
    }
};

const updatePlaylistField = async (request, reply) => {
    const { db } = request.server.plugins.mongodb;

    try {
        const data = request.payload;
        const field = data ? Object.keys(data).shift() : '';
        const { playlistId } = request.params;
        const result = await db.collection('playlists').update(
            { playlistId },
            { $set: { [field]: data[field] } }
        );

        const response = result.toJSON();
        const { ok, nModified, n } = response;

        if (ok && nModified) {
            return reply({ success: true, message: `${field} was updated` });
        }

        if (ok && n) {
            return reply({ success: false, message: 'Document was unchanged' });
        }

        return reply({ success: false, message: 'Update was not successful' });
    } catch (err) {
        console.log(err);
        return reply(Boom.internal('Something went wrong'));
    }
};

const updateTrackOrder = async (request, reply) => {
    const { db } = request.server.plugins.mongodb;

    try {
        const payload = request.payload;
        // don't save any airbreaks
        const tracks = payload.filter(o => !o.airBreak);
        const { playlistId } = request.params;

        const result = await db.collection('playlists').update(
            { playlistId },
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
        return reply(Boom.internal('Something went wrong'));
    }
};

const deleteTrackFromPlaylist = async (request, reply) => {
    const { db } = request.server.plugins.mongodb;

    try {
        const { playlistId, trackId } = request.params;

        const result = await db.collection('playlists').update(
            { playlistId }, { $pull: { songs: { id: trackId } } });

        const response = result.toJSON();
        // { ok: 1, nModified: 1, n: 1 }
        const { ok, nModified } = response;

        if (ok && nModified) {
            return reply({ success: true });
        }

        return reply({ success: false, message: 'Update was not successful' });
    } catch (err) {
        console.log(err);
        return reply(Boom.internal('Something went wrong'));
    }
};

export {
    getPlaylistsByShow,
    createPlaylist,
    addTrack,
    updateTracks,
    updatePlaylistField,
    updateTrackOrder,
    deleteTrackFromPlaylist,
    deletePlaylist
};
