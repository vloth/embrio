module.exports = {
  root: true,

  env: {
    es6: true,
    node: true
  },

  extends: ['eslint:recommended', 'plugin:prettier/recommended'],

  parserOptions: {
    ecmaVersion: 2020
  },

  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser',
      extends: ['plugin:@typescript-eslint/recommended'],
      plugins: ['@typescript-eslint'],
      parserOptions: {
        sourceType: 'module',
        warnOnUnsupportedTypeScriptVersion: true
      },
      rules: {
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off'
      }
    },
    {
      files: ['*.tsx'],
      extends: ['plugin:react/recommended'],
      plugins: ['jsx-a11y', 'react-hooks', '@emotion'],
      env: {
        browser: true
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      },
      settings: {
        react: {
          version: '17.0.2'
        }
      },
      rules: {
        'react/no-children-prop': 'off',
        'react/react-in-jsx-scope': 'off',
        'react/prop-types': 'off'
      }
    },
    {
      files: ['*.test.js', '*.test.ts', '*.test.tsx'],
      env: {
        mocha: true
      }
    }
  ],

  ignorePatterns: [
    '/.cache',
    '/.git',
    '/.husky',
    '/.yarn',
    '/**/node_modules',
    '/dist/',
    '**/*.js'
  ]
}
