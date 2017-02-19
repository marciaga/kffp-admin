import webpackConfig from '../../webpack.config.babel';

export default {
    server: {
        app: {
            slogan: 'Hapi.js backend with SPA React and Redux front-end'
        }
    },
    connections: [
        {
            port: 3000,
            labels: ['web']
        }
    ],
    registrations: [
        { plugin: 'h2o2' },
        { plugin: 'inert' },
        { plugin: 'scooter' },
        {
            plugin: {
                register: 'good',
                options: {
                    ops: false,
                    reporters: {
                        console: [{
                            module: 'good-console'
                        }, 'stdout']
                    }
                }
            }
        },
        { plugin: 'vision' },
        {
            plugin: {
                register: 'visionary',
                options: {
                    engines: { hbs: 'handlebars' },
                    path: 'src/templates',
                    partialsPath: 'src/templates/partials',
                    layoutPath: 'src/templates',
                    layout: 'layout'
                }
            }
        },
        {
            plugin: {
                register: 'hapi-mongodb',
                options: {
                    url: 'mongodb://localhost:27017/playlist-dev',
                    settings: {
                        db: {
                            native_parser: false
                        }
                    }
                }
            }
        },
        {
            plugin: {
                register: 'hapi-webpack-dev-middleware',
                options: {
                    config: webpackConfig
                }
            }
        },
        {
            plugin: {
                register: 'hapi-webpack-hot-middleware'
            }
        },
        {
            plugin: {
                register: 'web-sockets'
            }
        },
        { plugin: './modules/auth' },
        { plugin: './modules/api' },
        { plugin: './modules/front-end' }
    ]
};
