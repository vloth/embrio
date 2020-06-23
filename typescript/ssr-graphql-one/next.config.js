const {withGraphQLConfig} = require('next-graphql-react/server')

module.exports = withGraphQLConfig({
  webpack: function(config) {
    config.externals = config.externals || {}
    config.externals['styletron-server'] = 'styletron-server'
    return config
  }
})
