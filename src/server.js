import Glue from 'glue';
import 'babel-polyfill';
import manifest from './config/manifest';

const url = process.env.DB_CONNECTION;
const options = { relativeTo: __dirname };

if (process.env.NODE_ENV === 'production') {
    const prodMongo = manifest.registrations.find(r => r.plugin.register && r.plugin.register === 'hapi-mongodb');
    prodMongo.plugin.options.url = url;
}

Glue.compose(manifest, options, (err, server) => {
    server.start((error) => {
        if (error) {
            console.log(error);
        }
        console.log('Server running at: ', server.info.uri);
    });
});
