import Koa from 'koa'
import * as glob from 'glob'
import * as path from 'path'
import { logger } from '@protocol/logger'
import bodyparser from 'koa-bodyparser'
import respond from './transport/http/respond'
import { errorHandler } from './transport/http/error-middleware'
import { registerRoutes } from './transport/http/dnamic-route-register'

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
