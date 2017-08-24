module.exports = {
    apps: [
        {
            name: 'app',
            script: 'index.js',
            env_production: {
                NODE_ENV: 'production'
            }
        }
    ]
};
