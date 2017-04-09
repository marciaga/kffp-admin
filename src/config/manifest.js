import webpackConfig from '../../webpack.config';

const DB_URL = `${process.env.DB_CONNECTION}/${process.env.DB_NAME}`;
const webpackHotMiddleware = {
    plugin: {
        register: 'hapi-webpack-hot-middleware'
    }
};
const webpackDevMiddleware = {
    plugin: {
        register: 'hapi-webpack-dev-middleware',
        options: {
            config: webpackConfig(process.env.NODE_ENV),
            options: {
                publicPath: '/js/'
            }
        }
    }
};

const manifest = {
    server: {
        app: {
            slogan: 'Hapi.js backend with SPA React and Redux front-end'
        }
    },
    connections: [
        {
            port: 8081,
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
                register: './modules/mongodb',
                options: {
                    url: DB_URL,
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
                register: 'web-sockets'
            }
        },
        { plugin: './modules/auth' },
        { plugin: './modules/api' },
        { plugin: './modules/front-end' }
    ]
};


if (process.env.NODE_ENV !== 'production') {
    manifest.registrations.push(webpackDevMiddleware, webpackHotMiddleware);
}

export default manifest;
