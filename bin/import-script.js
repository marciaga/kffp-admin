'use strict';

var _mongodb = require('mongodb');

var _mongodb2 = _interopRequireDefault(_mongodb);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _shortid = require('shortid');

var _shortid2 = _interopRequireDefault(_shortid);

var _legacyShows = require('./legacyShows.json');

var legacyShows = _interopRequireWildcard(_legacyShows);

var _summerSchedule = require('./summer-schedule-2017.json');

var scheduleData = _interopRequireWildcard(_summerSchedule);

var _stringParsing = require('../src/client/app/utils/stringParsing');

var _stringParsing2 = _interopRequireDefault(_stringParsing);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } } /* eslint-disable */


_dotenv2.default.load(); // load environment vars

var WRITE_DB_NAME = 'kffp-admin-prod';
var READ_DB_NAME = 'legacy-playlist';
var _process$env = process.env,
    TEMPORARY_USER_PASSWORD = _process$env.TEMPORARY_USER_PASSWORD,
    DB_CONNECTION = _process$env.DB_CONNECTION,
    DB_NAME = _process$env.DB_NAME;

var DB_URL = DB_CONNECTION + '/' + DB_NAME;
var whitelistedAdmins = ['mark.arciaga@gmail.com', 'gilliflower@gmail.com', 'hk.clone@gmail.com', 'amy.zimmerman@gmail.com', 'fenton.felicity@gmail.com'];

var dayOfWeekMapping = {
    0: 'Sunday',
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thursday',
    5: 'Friday',
    6: 'Saturday'
};

var mapDJsToShows = function mapDJsToShows(schedule) {
    return schedule.reduce(function (memo, obj) {
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

var dedupeNames = function dedupeNames(showDJMapping) {
    return Object.keys(showDJMapping).reduce(function (memo, obj) {
        if (!obj) {
            return memo;
        }

        memo[obj] = [].concat(_toConsumableArray(new Set(showDJMapping[obj])));

        return memo;
    }, {});
};

var parseJson = function parseJson(obj) {
    return Object.keys(obj).reduce(function (arr, val, i) {
        arr.push(obj[i]);

        return arr;
    }, []);
};

var getUserIdByName = function getUserIdByName() {};

var transformShows = function transformShows(parsedSchedule, users) {
    console.log('Transforming shows...');
    var isActive = true;
    var parsedLegacyShows = parseJson(legacyShows);
    var mappedDJsToShows = mapDJsToShows(parsedSchedule);
    var showNamesToDJNames = dedupeNames(mappedDJsToShows);

    var showNamesToDJIds = Object.keys(showNamesToDJNames).reduce(function (memo, key) {
        var userName = showNamesToDJNames[key][0];
        var user = users.find(function (u) {
            return u.displayName === userName;
        });

        memo[key] = [user._id];

        return memo;
    }, {});

    var transformedShows = parsedLegacyShows.map(function (show, index) {
        if (!show) {
            return;
        }

        var title = show.title,
            djName = show.djName,
            startDay = show.startDay,
            startHour = show.startHour,
            endHour = show.endHour,
            description = show.description;


        return {
            _id: (0, _mongodb.ObjectId)(),
            showName: title,
            users: showNamesToDJIds[title],
            dayOfWeek: dayOfWeekMapping[Number(startDay)],
            startTime: Number(startHour),
            endTime: Number(endHour),
            isActive: isActive,
            slug: (0, _stringParsing2.default)(title),
            description: description
        };
    });

    return transformedShows.filter(function (s) {
        return s;
    });
};

var transformUsers = function transformUsers(parsedSchedule) {
    console.log('Transforming users...');

    var schedule = parsedSchedule.map(function (s) {
        if (!s) {
            return;
        }

        var role = whitelistedAdmins.indexOf(s.email) > -1 ? 'admin' : 'dj';
        var email = s.email,
            djName = s.djName,
            firstName = s.firstName,
            lastName = s.lastName;


        return {
            _id: (0, _mongodb.ObjectId)(),
            email: email,
            password: TEMPORARY_USER_PASSWORD,
            displayName: djName,
            firstName: firstName,
            lastName: lastName,
            role: role
        };
    });

    return schedule.filter(function (s) {
        return s !== undefined;
    });
};

var readLegacyPlaylists = function _callee(db) {
    var result;
    return regeneratorRuntime.async(function _callee$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    _context.prev = 0;
                    _context.next = 3;
                    return regeneratorRuntime.awrap(db.collection('shows').find({}));

                case 3:
                    result = _context.sent;
                    return _context.abrupt('return', result.toArray());

                case 7:
                    _context.prev = 7;
                    _context.t0 = _context['catch'](0);

                    console.log('Failed in Read Legacy Playlists', _context.t0);

                case 10:
                case 'end':
                    return _context.stop();
            }
        }
    }, null, undefined, [[0, 7]]);
};

var transformPlaylists = function transformPlaylists(legacyPlaylists, shows) {
    console.log('Transforming Playlists...');

    var newPlaylists = [];

    legacyPlaylists.forEach(function (p) {
        // p is a show
        var playlists = p.playlists;

        // each show has a playlists array that contains its playlist objects
        // result is an array of transformed playlist objects for a particular show

        var result = playlists.map(function (plist) {
            var date = (0, _moment2.default)(plist.date, 'MMMM DD, YYYY').toISOString();
            var songs = plist.playlist.map(function (song) {
                if (!song) {
                    return;
                }
                var title = song.title,
                    artist = song.artist,
                    album = song.album,
                    label = song.label;

                var timestamp = _moment2.default.utc(song.timestamp, 'ddd MMM DD YYYY HH:mm:ss').utcOffset(8).toISOString();

                return {
                    id: (0, _mongodb.ObjectId)(),
                    title: title,
                    artist: artist,
                    album: album,
                    label: label,
                    releaseDate: '',
                    playedAt: timestamp
                };
            });

            var foundShow = shows.find(function (show) {
                return show.showName === p.showName;
            });

            return {
                _id: (0, _mongodb.ObjectId)(),
                showId: foundShow._id,
                playlistDate: date,
                playlistId: _shortid2.default.generate(),
                songs: songs
            };
        });

        newPlaylists.push.apply(newPlaylists, _toConsumableArray(result));
    });

    return newPlaylists;
};

var main = function main() {
    _mongodb2.default.connect('' + DB_URL + READ_DB_NAME, function _callee3(err, db) {
        var newAdminDb, collectionNames, parsedSchedule, users, shows, legacyPlaylists, transformedPlaylists, userResult, showResult, playlistResult;
        return regeneratorRuntime.async(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        if (!err) {
                            _context3.next = 2;
                            break;
                        }

                        throw new Error('Error connecting to Mongo: ' + err);

                    case 2:

                        console.log('Connected to ' + READ_DB_NAME + ' database');

                        _context3.prev = 3;
                        _context3.next = 6;
                        return regeneratorRuntime.awrap(_mongodb2.default.connect('' + DB_URL + WRITE_DB_NAME));

                    case 6:
                        newAdminDb = _context3.sent;
                        _context3.next = 9;
                        return regeneratorRuntime.awrap(newAdminDb.listCollections().toArray());

                    case 9:
                        collectionNames = _context3.sent;


                        collectionNames.forEach(function _callee2(collectionName) {
                            var name, result;
                            return regeneratorRuntime.async(function _callee2$(_context2) {
                                while (1) {
                                    switch (_context2.prev = _context2.next) {
                                        case 0:
                                            name = collectionName.name;

                                            if (name.startsWith('system.')) {
                                                _context2.next = 6;
                                                break;
                                            }

                                            _context2.next = 4;
                                            return regeneratorRuntime.awrap(newAdminDb.collection(name).drop());

                                        case 4:
                                            result = _context2.sent;


                                            if (result) {
                                                console.log('Dropping ' + WRITE_DB_NAME + ': ' + name);
                                            }

                                        case 6:
                                        case 'end':
                                            return _context2.stop();
                                    }
                                }
                            }, null, undefined);
                        });

                        parsedSchedule = parseJson(scheduleData);
                        users = transformUsers(parsedSchedule);
                        shows = transformShows(parsedSchedule, users);
                        _context3.next = 16;
                        return regeneratorRuntime.awrap(readLegacyPlaylists(db));

                    case 16:
                        legacyPlaylists = _context3.sent;
                        transformedPlaylists = transformPlaylists(legacyPlaylists, shows);
                        _context3.next = 20;
                        return regeneratorRuntime.awrap(newAdminDb.collection('users').insertMany(users));

                    case 20:
                        userResult = _context3.sent;
                        _context3.next = 23;
                        return regeneratorRuntime.awrap(newAdminDb.collection('shows').insertMany(shows));

                    case 23:
                        showResult = _context3.sent;
                        _context3.next = 26;
                        return regeneratorRuntime.awrap(newAdminDb.collection('playlists').insertMany(transformedPlaylists));

                    case 26:
                        playlistResult = _context3.sent;


                        if (userResult.result.ok && showResult.result.ok && playlistResult.result.ok) {
                            console.log('Import success!');

                            process.exit();
                        }

                        console.log('Something went wrong with the import');

                        process.exit(1);
                        _context3.next = 35;
                        break;

                    case 32:
                        _context3.prev = 32;
                        _context3.t0 = _context3['catch'](3);

                        console.log(_context3.t0);

                    case 35:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, null, undefined, [[3, 32]]);
    });
};

main();
/* eslint-enable */
