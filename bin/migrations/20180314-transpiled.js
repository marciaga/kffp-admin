'use strict';

require('babel-polyfill');

var config = require('dotenv');
var MongoClient = require('mongodb');

config.load();

var DB_CONNECTION = process.env.DB_CONNECTION;


var main = function main() {
    return MongoClient.connect(DB_CONNECTION, function _callee(err, db) {
        return regeneratorRuntime.async(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        if (!err) {
                            _context.next = 2;
                            break;
                        }

                        throw new Error('Error connecting to Mongo: ' + err);

                    case 2:

                        console.log('Connected to database');

                        _context.prev = 3;
                        _context.next = 6;
                        return regeneratorRuntime.awrap(db.createCollection('counters'));

                    case 6:
                        _context.next = 8;
                        return regeneratorRuntime.awrap(db.collection('counters').insert({ _id: 'productid', sequence_value: 0 }));

                    case 8:

                        process.exit();
                        _context.next = 15;
                        break;

                    case 11:
                        _context.prev = 11;
                        _context.t0 = _context['catch'](3);

                        console.log(_context.t0);
                        process.exit(1);

                    case 15:
                    case 'end':
                        return _context.stop();
                }
            }
        }, null, undefined, [[3, 11]]);
    });
};

main();
