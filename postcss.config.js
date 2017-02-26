module.exports = {
    use: [
        'autoprefixer',
        'css-mqpacker',
        'cssnano'
    ],
    autoprefixer: {
        browsers: '> 5%'
    },
    'css-mqpacker': {
        sort: true
    },
    'local-plugins': false,
    input: 'public/css/main.css',
    output: 'public/css/main.css'
};
