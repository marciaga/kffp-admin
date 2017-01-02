import Joi from 'joi';
import Boom from 'boom';
import moment from 'moment';

const songSchema = {
    id: Joi.number(),
    title: Joi.string().required(),
    artist: Joi.string().required(),
    album: Joi.string(),
    releaseYear: Joi.string(),
    dateTimePlayed: Joi.date().iso()
};

const playlistSchema = Joi.object().keys({
    _id: Joi.string(),
    showId: Joi.string().required(),
    showDateTime: Joi.date().iso().required(),
    dateSlug: Joi.string().required(),
    songs: Joi.array().items(Joi.object(songSchema))
});

const getPlaylists = async (db, show) => {
    const showId = show._id.toString();

    return await db.collection('playlists').find({
        showId
    })
    .toArray();
};

const getShow = async (db, slug) => {
    return await db.collection('shows').findOne({
        slug: slug
    });
};

// TODO this needs to be limited so we don't fetch everything at once
const getPlaylistsByShow = async (request, reply) => {
    const { db } = request.server.plugins['hapi-mongodb'];
    const { slug } = request.params;

    try {
        const show = await getShow(db, slug);
        const playlists = await getPlaylists(db, show);
        const mergedData = {
            playlists: playlists,
            show
        };

        return reply(mergedData);

    } catch (err) {
        console.log(err);
        return err;
    }
};

const createPlaylist = async (request, reply) => {
    const { db } = request.server.plugins['hapi-mongodb'];
    const now = moment();
    const showDateTime = now.toISOString();
    const dateSlug = now.format('Y[-]MM[-]DD');
    const { showId } = request.payload;

    const newPlaylist = {
        showId,
        showDateTime,
        dateSlug,
        songs: []
    };

    try {
        const result = await db.collection('playlists').find({
            dateSlug,
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
                // if value === null, object is valid
                if (err) {
                    console.log(err);
                    throw Boom.badRequest(err);
                }

                return true;
            });
        } catch (err) {
            return reply(err);
        }

        db.collection('playlists').insert(newPlaylist, (err, doc) => {
            if (err) {
                return reply(Boom.internal('Internal MongoDB error', err));
            }

            const { ops } =  doc;
            const newDoc = ops.find((o, i) => {
                return i === 0;
            });

            return reply(newDoc);
        });

    } catch (err) {
        console.log(err)
        return reply(err);
    }
};

const addTrack = async (request, reply) => {
    const { db, ObjectID } = request.server.plugins['hapi-mongodb'];

    try {
        const track = request.payload;
        const { playlistId } = request.params;
        const id = new ObjectID(playlistId);


        const result = await db.collection('playlists').update(
            { _id: id },
            { $push: { songs: track } }
        );

        const response = result.toJSON();
        const { ok, nModified } = response;

        if (ok && nModified) {
            return reply({ success: true });
        }

        return reply({ success: false, message: 'Update was not successful' });
    } catch (err) {
        console.log(err)
        return reply(err);
    }
};

export { getPlaylistsByShow, createPlaylist, addTrack };
