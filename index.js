require('babel-core/register');

const Path = require('path');

const client = Path.join(__dirname, 'src', 'client');
const server = Path.join(__dirname, 'src', 'modules');

require('dotenv').config(); // load env vars
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
process.env.NODE_PATH = `${server}:${client}`;

require('module').Module._initPaths();

require('./src/server.js');
