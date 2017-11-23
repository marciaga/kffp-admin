require('babel-polyfill');

const config = require('dotenv');
const MongoClient = require('mongodb');

config.load();

const { DB_CONNECTION, DB_NAME } = process.env;
const DB_URL = `${DB_CONNECTION}/${DB_NAME}`;

const main = () => MongoClient.connect(DB_URL, async (err, db) => {
    if (err) {
        throw new Error(`Error connecting to Mongo: ${err}`);
    }

    console.log('Connected to database');

    try {
        await db.collection('users').createIndex({ firstName: 'text', lastName: 'text' });
        await db.collection('users').createIndex({ email: 'text' });

        console.log('Indicies created successfully');
        process.exit();
    } catch (e) {
        console.log(e);
        process.exit(1);
    }
});

main();
