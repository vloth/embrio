import Koa from 'koa'
import * as glob from 'glob'
import * as path from 'path'
import bodyparser from 'koa-bodyparser'
import respond from '@protocol/http/respond'
import { logger } from '@protocol/logger'
import { errorHandler } from '@protocol/http/error-middleware'
import { registerRoutes } from '@protocol/http/dynamic-route-register'

export const app = new Koa()

app.use(bodyparser())
app.use(respond())
app.use(errorHandler)

registerRoutes(
  app,
  glob.sync(path.join(__dirname, '/core/*/http.transport.ts'))
)

app.on('error', (err: Error, ctx: Koa.Context) => {
  const [path, status] = [ctx.request.url, ctx.status]
  logger.error(
    { err, path, status },
    'An error happened at %s, response (%d)',
    path,
    status
  )
})
