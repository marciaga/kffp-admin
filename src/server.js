import Glue from 'glue';
import 'babel-polyfill';
import manifest from './config/manifest';

const options = { relativeTo: __dirname };

Glue.compose(manifest, options, (err, server) => {
    if (err) {
        throw err;
    }

    server.start((error) => {
        if (error) {
            console.log(error);
        }
        console.log('Server running at: ', server.info.uri);
    });
});
