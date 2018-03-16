require('babel-polyfill');

const config = require('dotenv');
const MongoClient = require('mongodb');

config.load();

const { DB_CONNECTION } = process.env;

const main = () => MongoClient.connect(DB_CONNECTION, async (err, db) => {
    if (err) {
        throw new Error(`Error connecting to Mongo: ${err}`);
    }

    console.log('Connected to database');

    try {
        await db.createCollection('counters');
        await db.collection('counters').insert({ _id: 'productid', sequence_value: 0 });

        process.exit();
    } catch (e) {
        console.log(e);
        process.exit(1);
    }
});

main();
