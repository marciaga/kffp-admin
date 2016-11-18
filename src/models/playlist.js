import Joi from 'joi';

class Playlist { 

    static create (showId, title, description, img, callback) {
        const doc = {
            showId,
            title,
            description,
            img
        };

        this.insertOne(doc, (err, docs) => {
            if (err) {
                callback();
                return;
            }

            callback(null, docs[0]);
        });
    }
}

Playlist.collection = 'playlists';

const song = Joi.object().keys({
    title: Joi.string(),
    artist: Joi.string(),
    album: Joi.string(),
    year: Joi.string(),
    label: Joi.string(),
    notes: Joi.string(),
    img64: Joi.string(),
    img300px: Joi.string(),
    played: Joi.boolean(),
    playedAt: Joi.date().iso()
});

Playlist.schema = Joi.object().keys({
    showId: Joi.string(),
    title: Joi.string(),
    description: Joi.string(),
    img: Joi.string(),
    createdAt: Joi.date().iso(),
    songs: Joi.array().items(song)
});

export default Playlist;
