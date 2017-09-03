'use strict';

var config = require('dotenv');
var MongoClient = require('mongodb');
var Promise = require('bluebird');
var fs = require('fs');

config.load();

var readFileAsync = Promise.promisify(fs.readFile);
var _process$env = process.env,
    DB_CONNECTION = _process$env.DB_CONNECTION,
    DB_NAME = _process$env.DB_NAME;

var DB_URL = DB_CONNECTION + '/' + DB_NAME;

var main = function main() {
    return MongoClient.connect(DB_URL, function _callee2(err, db) {
        var contents, parsedResult;
        return regeneratorRuntime.async(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        if (!err) {
                            _context2.next = 2;
                            break;
                        }

                        throw new Error('Error connecting to Mongo: ' + err);

                    case 2:

                        console.log('Connected to database');
                        _context2.prev = 3;
                        _context2.next = 6;
                        return regeneratorRuntime.awrap(readFileAsync('bin/playlistIds.json', { encoding: 'utf8' }));

                    case 6:
                        contents = _context2.sent;
                        parsedResult = JSON.parse(contents);


                        parsedResult.map(function _callee(c) {
                            var doc, _doc$songs, songs;

                            return regeneratorRuntime.async(function _callee$(_context) {
                                while (1) {
                                    switch (_context.prev = _context.next) {
                                        case 0:
                                            _context.prev = 0;
                                            _context.next = 3;
                                            return regeneratorRuntime.awrap(db.collection('playlists').findOne({
                                                playlistId: c.playlistId
                                            }));

                                        case 3:
                                            doc = _context.sent;
                                            _doc$songs = doc.songs, songs = _doc$songs === undefined ? [] : _doc$songs;
                                            _context.next = 7;
                                            return regeneratorRuntime.awrap(db.collection('playlists').updateOne({ playlistId: c.playlistId }, { $set: { songs: songs.slice().reverse() } }));

                                        case 7:

                                            console.log('Updated playlistId ' + c.playlistId);
                                            _context.next = 14;
                                            break;

                                        case 10:
                                            _context.prev = 10;
                                            _context.t0 = _context['catch'](0);

                                            console.log(_context.t0);
                                            throw new Error(_context.t0);

                                        case 14:
                                        case 'end':
                                            return _context.stop();
                                    }
                                }
                            }, null, undefined, [[0, 10]]);
                        });
                        _context2.next = 15;
                        break;

                    case 11:
                        _context2.prev = 11;
                        _context2.t0 = _context2['catch'](3);

                        console.log(_context2.t0);
                        process.exit(1);

                    case 15:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, null, undefined, [[3, 11]]);
    });
};

main();
