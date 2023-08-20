module.exports = {
    'env': {
        'browser': true,
        'es2021': true,
        'node': true,
        'jest': true
    },
    'extends': [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier'
    ],
    'overrides': [
    ],
    'parser': '@typescript-eslint/parser',
    'parserOptions': {
        'ecmaVersion': 'latest',
        'sourceType': 'module'
    },
    'plugins': [
        'react',
        '@typescript-eslint',
        'prettier'
    ],
    'rules': {
        'react/react-in-jsx-scope': 'off',
        camelcase: ['error', {allow: ['access_token', 'refresh_token']}],
        quotes: ['error', 'single'],
        'no-duplicate-imports': 'error',
        semi: 'error',
        'linebreak-style': ['error', 'unix'],
        'spaced-comment': ['error', 'always', { markers: ['/'] }],
    },
    settings: {
        'import/resolver': {
            typescript: {},
        },
    },
};
