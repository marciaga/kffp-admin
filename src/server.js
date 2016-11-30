import path from 'path';
import Glue from 'glue';
import 'babel-polyfill';
import manifest from './config/manifest.json';

const url = process.env.DB_CONNECTION;
const options = { relativeTo: __dirname };

if (process.env.NODE_ENV === 'production') {
    let prodMongo = manifest.registrations.find(r => r.plugin.register && r.plugin.register === 'hapi-mongodb');
    prodMongo.plugin.options.url = url;
}

Glue.compose(manifest, options, (err, server) => {
    server.start((err) => {
        if (err) {
            console.log(err);
        }
        console.log('Server running at: ', server.info.uri);
    });
});
