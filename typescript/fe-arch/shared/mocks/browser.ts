import { setupWorker } from 'msw'
import { handlers } from './handlers'

function onUnhandledRequest({ url, method }) {
  if (url.pathname.startsWith('/api')) {
    throw new Error(`Unhandled ${method} request to ${url}`)
  }
}

export function start() {
  const worker = setupWorker(...handlers)
  worker.start({ quiet: true, onUnhandledRequest: onUnhandledRequest })
}
