import React from 'react'
import { Client as Styletron } from 'styletron-engine-atomic'
import { Provider as StyletronProvider } from 'styletron-react'
import { LightTheme, BaseProvider } from 'baseui'
import { Header } from './components/Header'
import { LogsList } from './components/LogsList'

const engine = new Styletron()

export function App() {
  return (
    <StyletronProvider value={engine}>
      <BaseProvider theme={LightTheme}>
        <Header />
        <LogsList />
      </BaseProvider>
    </StyletronProvider>
  )
}
