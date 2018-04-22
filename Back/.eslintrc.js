module.exports = {
    "env": {
        "es6": true,
        "node": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "sourceType": "module",
        "ecmaVersion": 2017, // 支持ES2071语法
    },
    "rules": {
        'generator-star-spacing': 'off', // allow async-await
        'no-console': 'off', // 允许使用console

        "linebreak-style": ["error", "windows"],
        "quotes": ["error", "single"],
        'semi': ['error', 'always'],
        'indent': ['error', 4, { 'SwitchCase': 1 }],
        'comma-dangle': ['error', 'always-multiline'],
        'no-var': ['error'],
        'one-var': ['error', 'never'],
        'space-before-blocks': ['error', 'never'],
        'space-before-function-paren': ['error', 'never'],
        'arrow-spacing': ['error', { 'before': false, 'after': false }],
        'operator-linebreak': [2, 'before'],
        'brace-style': ['error', 'stroustrup'],
    }
};
