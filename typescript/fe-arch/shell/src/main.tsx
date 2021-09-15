import { StrictMode } from 'react'
import { render } from 'react-dom'
import { App } from './App'
import { GlobalStyles } from 'twin.macro'

if (process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require('shared/mocks/browser').start()
}

render(
  <StrictMode>
    <GlobalStyles />
    <App />
  </StrictMode>,
  document.getElementById('root')
)
