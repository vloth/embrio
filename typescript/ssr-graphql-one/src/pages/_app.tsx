import 'cross-fetch/polyfill'
import React from 'react'
import {Provider as StyletronProvider} from 'styletron-react'
import {LightTheme, BaseProvider} from 'baseui'
import {styletron, debug} from '../styletron'
import {GraphQLProvider} from 'graphql-react'
import {withGraphQLApp} from 'next-graphql-react'

const App = ({Component, pageProps, graphql}: any) => (
  <GraphQLProvider graphql={graphql}>
    <StyletronProvider value={styletron} debug={debug} debugAfterHydration>
      <BaseProvider theme={LightTheme}>
        <Component {...pageProps} />
      </BaseProvider>
    </StyletronProvider>
  </GraphQLProvider>
)

export default withGraphQLApp(App)
