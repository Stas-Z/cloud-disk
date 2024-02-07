module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: ['airbnb', 'prettier'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: ['@typescript-eslint', 'unused-imports'],
    rules: {
        'arrow-body-style': 'off',
        'consistent-return': 'off',
        'import/no-unresolved': 'off',
        'import/prefer-default-export': 'off',
        'no-unused-vars': 'warn',
        'unused-imports/no-unused-imports': 'error',
        'no-shadow': 'off',
        'import/extensions': 'off',
        'import/no-extraneous-dependencies': 'off',
        'no-underscore-dangle': 'off',
        semi: ['error', 'never'],
        'max-len': [
            'error',
            {
                ignoreComments: true,
                code: 125,
            },
        ],
        'no-param-reassign': 'off',
        'no-undef': 'off',
        'import/order': [
            'error',
            {
                groups: ['builtin', 'external', 'internal'],
                pathGroups: [
                    {
                        pattern: '@/**',
                        group: 'external',
                        position: 'after',
                    },
                ],
                'newlines-between': 'always',
                alphabetize: {
                    order: 'asc',
                    caseInsensitive: true,
                },
            },
        ],
        'react/no-unstable-nested-components': 'warn',
    },
    globals: {},
    overrides: [],
}
