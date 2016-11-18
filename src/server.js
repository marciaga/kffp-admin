import path from 'path';
import Glue from 'glue';
import 'babel-polyfill';

import manifest from './config/manifest.json';

const options = { relativeTo: __dirname };

Glue.compose(manifest, options, (err, server) => {
    server.start((err) => {
        if (err) {
            console.log(err);
        }
        console.log('Server running at: ', server.info.uri);
    });
});
