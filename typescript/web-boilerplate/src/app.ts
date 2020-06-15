import * as Koa from 'koa'
import * as bodyparser from 'koa-bodyparser'

import { logger } from '@logger'
import { errorHandler } from './infra/http/error-middleware'
import { router as todoRouter } from './todo/router'

export const app = new Koa()

app.use(bodyparser())
app.use(errorHandler)
app.use(todoRouter.routes())

app.on('error', (err: Error, ctx: Koa.Context) => {
  const [path, status] = [ctx.request.url, ctx.status]
  logger.error(
    { err, path, status },
    'An error happened at %s, response (%d)',
    path,
    status
  )
})
