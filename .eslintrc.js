module.exports = {
    parserOptions: {
        ecmaVersion: 2017,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
            experimentalObjectRestSpread: true,
            destructuring: true
        }
    },
    env: {
        browser: true,
        node: true,
        mocha: true,
        jest: true
    },
    parser: 'babel-eslint',
    extends: ['airbnb'],
    rules: {
        indent: ['error', 4],
        'react/jsx-indent': [2, 4],
        'react/jsx-filename-extension': [1, { 'extensions': ['.js', '.jsx'] }],
        'react/prop-types': 1,
        'react/forbid-prop-types': [1, { 'forbid': [] }],
        'react/jsx-indent-props': [2, 4],
        'react/no-multi-comp':[0],
        'react/jsx-boolean-value': [2, 'always'],
        'react/no-string-refs': 1,
        'react/no-children-prop': ['warn'],
        'react/no-find-dom-node': ['warn'],
        'react/prefer-stateless-function': 1,
        'no-console': 0,
        'no-plusplus': 0,
        'comma-dangle': ['error', 'never'],
        extensions: 0,
        'arrow-body-style': ['error', 'as-needed'],
        'consistent-return': [0],
        'no-param-reassign': [2, {
            'props': false
        }],
        'space-before-function-paren': ['error', 'always'],
        'class-methods-use-this': 0,
        'no-underscore-dangle': 0,
        'no-useless-constructor': 2,
        'no-class-assign': [0],
        'array-callback-return': [0],
        'no-case-declarations': 0,
        'global-require': [0],
        'func-names': ['warn', 'as-needed'],
        'import/no-extraneous-dependencies': 0,
        'no-unused-vars': [2, { 'varsIgnorePattern': '^_|^id' }],
    },
    settings: {
        'import/ignore': ['js']
    }
};
