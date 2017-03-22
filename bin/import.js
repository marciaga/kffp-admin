import MongoClient, { ObjectId } from 'mongodb';
import config from 'dotenv';
import moment from 'moment';
import shortid from 'shortid';
import * as legacyShows from './legacyShows';
import * as scheduleData from './winter-schedule';
import slugify from '../src/client/app/utils/stringParsing';

config.load(); // load environment vars

const WRITE_DB_NAME = 'kffp-admin';
const READ_DB_NAME = 'legacy-playlist';
const DB_URL = 'mongodb://localhost:27017/';
const { TEMPORARY_USER_PASSWORD } = process.env;

const dayOfWeekMapping = {
    0: 'Sunday',
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thursday',
    5: 'Friday',
    6: 'Saturday'
};

const mapDJsToShows = (schedule) => {
    return schedule.reduce((memo, obj) => {
        if (!obj) {
            return memo;
        }
        // at first, there won't be a memo[obj.showName], so it'll end up an empty array
        // into which we push the dj name
        // but if there is a memo[obj.showName], then we just push in the next name
        memo[obj.showName] = memo[obj.showName] || [];
        memo[obj.showName].push(obj.djName);

        return memo;
    }, {});
};

const dedupeNames = (showDJMapping) => (Object.keys(showDJMapping)
    .reduce((memo, obj) => {
        if (!obj) {
            return memo;
        }

        memo[obj] = [ ...new Set(showDJMapping[obj]) ];

        return memo;
    }, {})
);

const parseJson = (obj) => (Object.keys(obj).reduce((arr, val, i) => {
   arr.push(obj[i]);

   return arr;
}, []));



const transformShows = (parsedSchedule) => {
    console.log('Transforming shows...')
    const isActive = true;

    const parsedLegacyShows = parseJson(legacyShows);
    const mappedDJsToShows = mapDJsToShows(parsedSchedule);
    const showNamesToDJNames = dedupeNames(mappedDJsToShows);
    const transformedShows = parsedLegacyShows.map((show, index) => {
        if (!show) {
            return;
        }

        const { title, djName, startDay, startHour, endHour, description } = show;

        return {
            _id: ObjectId(),
            showName: title,
            users: showNamesToDJNames[title],
            dayOfWeek: dayOfWeekMapping[Number(startDay)],
            startTime: Number(startHour),
            endTime: Number(endHour),
            isActive,
            slug: slugify(title),
            description: description
        }
    });

    return transformedShows;
};

const transformUsers = (parsedSchedule) => {
    console.log('Transforming users...');

    return parsedSchedule.map(s => {
        if (!s) {
            return;
        }

        return {
            _id: ObjectId(),
            email: s.email,
            password: TEMPORARY_USER_PASSWORD,
            displayName: s.djName,
            role: 'dj' // @TODO need a mapping of displayNames of people who should have admin roles
        };
    });
};

const readLegacyPlaylists = async (db) => {
    try {
        const result = await db.collection('shows').find({});

        return result.toArray();
    } catch (e) {
        console.log('Failed in Read Legacy Playlists', e);
    }
};

const transformPlaylists = (legacyPlaylists, shows) => {
    console.log('Transforming Playlists...');

    let newPlaylists = [];

    legacyPlaylists.forEach((p) => {
        // p is a show
        const { playlists } = p;

        // each show has a playlists array that contains its playlist objects
        // result is an array of transformed playlist objects for a particular show
        const result = playlists.map((plist) => {
            const date = moment(plist.date, 'MMMM DD, YYYY').toISOString();
            const songs = plist.playlist.map(song => {
                if (!song) {
                    return;
                }

                const timestamp = moment
                    .utc(song.timestamp, 'ddd MMM DD YYYY HH:mm:ss')
                    .utcOffset(8)
                    .toISOString();

                return {
                    id: ObjectId(),
                    title: song.title,
                    artist: song.artist,
                    album: song.album,
                    label: song.label,
                    releaseYear: '',
                    playedAt: timestamp
                };
            });

            const foundShow = shows.find(show => show.showName === p.showName);

            return {
                _id: ObjectId(),
                showId: foundShow._id,
                playlistDate: date,
                playlistId: shortid.generate(),
                songs
            };
        });

        newPlaylists.push(...result);
    });

    return newPlaylists;
};

const main = () => {
    MongoClient.connect(`${DB_URL}${READ_DB_NAME}`, async (err, db) => {
        if (err) {
            throw new Error(`Error connecting to Mongo: ${err}`);
        }

        console.log('Connected to MongoDB');

        const parsedSchedule = parseJson(scheduleData);

        const shows = transformShows(parsedSchedule);
        const users = transformUsers(parsedSchedule);
        const legacyPlaylists = await readLegacyPlaylists(db);
        const transformedPlaylists = transformPlaylists(legacyPlaylists, shows);

        // connect to WRITE DB and write all the things

        process.exit();
    });
};

main();
