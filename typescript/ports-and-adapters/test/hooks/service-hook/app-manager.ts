import type { Server } from 'http'

export async function startApplication() {
  const app = (await import('../../../src/app')).app
  return app.listen()
}

export async function stopApplication(server: Server | undefined) {
  return server == null
    ? Promise.resolve()
    : new Promise(resolve => server.close(resolve))
}
