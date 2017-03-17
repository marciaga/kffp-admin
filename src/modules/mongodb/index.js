import Mongodb from 'mongodb';
import Joi from 'joi';

const MongoClient = Mongodb.MongoClient;
const ObjectID = Mongodb.ObjectID;
const singleOption = Joi.object({
    url: Joi.string().default('mongodb://localhost:27017/test'),
    settings: Joi.object()
}).strict();
const optionsSchema = Joi.array().items(singleOption).min(1).single();

exports.register = (serv, pluginOptions, next) => {
    optionsSchema.validate(pluginOptions, (error, opt) => {
        if (error) {
            return next(error);
        }

        const expose = {
            lib: Mongodb,
            ObjectID
        };

        const connectToMongo = (connectionOptions) => {
            const { url, settings } = connectionOptions;

            if (url && settings) {
                return MongoClient.connect(url, settings);
            }

            return new Promise((resolve, reject) => reject('The URL or Settings were incomplete'));
        };

        const initializePlugin = async (options, server) => {
            const optionsObject = options.length ? options[0] : [];

            try {
                const connection = await connectToMongo(optionsObject);
                const connectionOptionsToLog = {
                    ...optionsObject,
                    url: optionsObject.url.replace(/mongodb:\/\/([^/]+):([^@]+)@/, 'mongodb://$1:******@')
                };

                server.log(['mongodb', 'info'], `MongoClient connection created for ${JSON.stringify(connectionOptionsToLog)}`);

                expose.db = connection;

                Object.keys(expose).forEach(key => server.expose(key, expose[key]));

                server.on('stop', () => [].concat(expose.db).forEach(db => db.close(err => server.log(['mongodb', 'error'], err))));

            } catch (e) {
                console.log(e);
            } finally {
                next();
            }
        };

        initializePlugin(opt, serv);
    });
};

exports.register.attributes = {
    pkg: require('./package.json')
};
