import MongoClient, { ObjectId } from 'mongodb';
import config from 'dotenv';
import * as legacyShows from './legacyShows';

config.load(); // load environment vars

const DB_NAME = 'kffp-admin';
const DB_URL = `mongodb://localhost:27017/${DB_NAME}`;
const { TEMPORARY_USER_PASSWORD } = process.env;

/**
legacyShows schema

"showID":"[KFFP99997]",
"title":"Making Pyramids",
"djName":"DJ KIttybot",
"description":"Please enjoy this mix of music to make pyramids to. While eclectic, your record Selectrix, DJ Kittybot, leans towards minimal electronics, ambient, noise, and noisy rock.",
"startDay":"5",
"startHour":"2",
"endDay":"5",
"endHour":"4"
*/

const showMapping = {
    title: 'showName',
    djName: 'users',
    startDay: 'dayOfWeek',
    startHour: 'startTime',
    endHour: 'endTime',
    description: 'description'
};
/*
    _id: Joi.string(),
    showName: Joi.string().required(),
    users: Joi.array().items(Joi.string()).required(),
    dayOfWeek: Joi.string().required(),
    startTime: Joi.number().integer().required(),
    endTime: Joi.number().integer().required(),
    isActive: Joi.boolean().required(),
    slug: Joi.string().required(),
    description: Joi.string()
*/

const dayOfWeekMapping = {
    0: 'Sunday',
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thursday',
    5: 'Friday',
    6: 'Saturday'
};

const transformShows = () => {
    console.log('Transforming shows...')
    const isActive = true;

    const parsedLegacyShows = Object.keys(legacyShows).reduce((arr, val, i) => {
       arr.push(legacyShows[i]);

       return arr;
    }, []);

    const transformedShows = parsedLegacyShows.map((show, index) => {
        if (!show) {
            return;
        }

        const { title, djName, startDay, startHour, endHour, description } = show;

        return {
            _id: ObjectId(),
            showName: title,
            users: [djName],
            dayOfWeek: dayOfWeekMapping[Number(startDay)],
            startTime: Number(startHour),
            endTime: Number(endHour),
            isActive,
            description: description
        }
    });

    console.log(transformedShows)
    // write transformedShows to shows collection
    return transformedShows;
};

const transformUsers = () => {
    console.log('Transforming users...')

/*
_id: Joi.string(),
email: Joi.string().email().required(),
password: Joi.string(),
displayName: Joi.string().required(),
role: Joi.string().required()
*/
    return {
        _id: ObjectId(),
        email: '',
        password: TEMPORARY_USER_PASSWORD,
        displayName: '',
        role: 'DJ'
    };

};

const transformPlaylists = () => {
    console.log('Transforming Playlists...');
};

const main = () => {
    MongoClient.connect(DB_URL, async (err, db) => {
        if (err) {
            throw new Error(`Error connecting to Mongo: ${err}`);
        }

        console.log('Connected to MongoDB');
    });
};
