module.exports = function config(api) {
  return {
    presets: [
      [
        '@babel/preset-env',
        api.caller(x => !x || x.target === 'node' || x.target === undefined)
          ? {
              targets: { node: '14' },
              useBuiltIns: 'usage',
              corejs: { version: 3, proposals: true }
            }
          : {}
      ]
    ],

    plugins: [],

    ignore: api.env() === 'test' ? [] : ['**/*.test.ts'],
    sourceMaps: api.env() === 'production',

    overrides: [
      {
        test: /\.tsx?$/,
        presets: ['@babel/preset-typescript']
      },

      {
        test: /\.tsx$/,
        presets: [
          [
            '@babel/preset-react',
            {
              development: api.env() === 'development',
              useBuiltIns: true,
              runtime: 'automatic',
              importSource: '@emotion/react'
            }
          ]
        ],
        plugins: ['@emotion/babel-plugin', 'babel-plugin-macros']
      },

      {
        test: '**/*.d.ts',
        presets: [['@babel/preset-env', { targets: { esmodules: true } }]]
      }
    ]
  }
}
