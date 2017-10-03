import Hoek from 'hoek';
import Boom from 'boom';
import ElasticSearch from 'elasticsearch';

const internals = {
    defaults: {
        config: {
            localhost: 9200
        }
    }
};

exports.register = (plugin, options, next) => {
    const settings = Hoek.applyToDefaults(internals.defaults, options);

    plugin.log(['hapi-elastic'], 'Hapi Elastic plugin registration started.');
    plugin.expose('es', new ElasticSearch.Client(settings.config));

    plugin.ext('onPostHandler', (req, rep) => {
        const { response } = req;

        if (response instanceof ElasticSearch.errors._Abstract) {
            rep(Boom.create(response.status, response.message, response));
        } else {
            rep(response);
        }
    });

    plugin.log(['hapi-elastic'], 'Hapi Elastic plugin registration ended.');
    return next();
};

exports.register.attributes = {
    pkg: require('./package.json')
};
