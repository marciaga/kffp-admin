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
const { SENTRY_PUBLIC_KEY, SENTRY_SECRET_KEY, SENTRY_PROJECT_ID } = process.env;
const SENTRY_DSN = `http://${SENTRY_PUBLIC_KEY}:${SENTRY_SECRET_KEY}@sentry.io/${SENTRY_PROJECT_ID}`;
const sentryPlugin = {
    plugin: {
        register: 'hapi-raven-boom',
        options: {
            dsn: SENTRY_DSN,
            settings: {
                captureUnhandledRejections: true
            },
            tags: ['some-tag']
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
            port: process.env.PORT || 3000,
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
                            native_parser: false,
                            numberOfRetries: 30,
                            retryMiliSeconds: 1000
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

const { NODE_ENV } = process.env;

if (NODE_ENV === 'development') {
    manifest.registrations.push(webpackDevMiddleware, webpackHotMiddleware);
    // cloud9 needs localhost set explicitly
    manifest.connections[0].host = '127.0.0.1';
}

if (NODE_ENV === 'production' || NODE_ENV === 'staging') {
    manifest.registrations.push(sentryPlugin);
}

export default manifest;
