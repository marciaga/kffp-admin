import 'babel-polyfill';

const config = require('dotenv');
const MongoClient = require('mongodb');
const Promise = require('bluebird');
const fs = require('fs');

config.load();

const readFileAsync = Promise.promisify(fs.readFile);
const { DB_CONNECTION, DB_NAME } = process.env;
const DB_URL = `${DB_CONNECTION}/${DB_NAME}`;

const main = () => MongoClient.connect(DB_URL, async (err, db) => {
    if (err) {
        throw new Error(`Error connecting to Mongo: ${err}`);
    }

    console.log('Connected to database');
    try {
        // read JSON file
        const contents = await readFileAsync('bin/playlistIds.json',
            { encoding: 'utf8' });

        const parsedResult = JSON.parse(contents);

        parsedResult.map(async (c) => {
            try {
                const doc = await db.collection('playlists').findOne({
                    playlistId: c.playlistId
                });

                const { songs = [] } = doc;

                await db.collection('playlists').updateOne(
                    { playlistId: c.playlistId },
                    { $set: { songs: songs.slice().reverse() } }
                );

                console.log(`Updated playlistId ${c.playlistId}`);
            } catch (e) {
                console.log(e);
                throw new Error(e);
            }
        });
    } catch (e) {
        console.log(e);
        process.exit(1);
    }
});

main();
