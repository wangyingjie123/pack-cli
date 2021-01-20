module.exports = {
    env: {
        commonjs: true,
        es6: true,
        node: true,
    },
    extends: [
        'airbnb-base',
    ],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
    },
    parserOptions: {
        ecmaVersion: 2018,
    },
    rules: {
        "indent": ["error", 4],
        'func-names': 0,
        'no-param-reassign': 0,
        'global-require': 0,
        'import/no-dynamic-require': 0,
        'no-console': 0,
        'no-unused-expressions': 0,
        'array-bracket-spacing': ['error', 'never'],
        'object-curly-spacing': ['error', 'never'],
        "comma-dangle": ["error", "never"],
        "arrow-parens": [2, "as-needed"],
        'max-len': ['error', 120],
        "import/no-extraneous-dependencies": ["error", {"devDependencies": true}]
    },
};
