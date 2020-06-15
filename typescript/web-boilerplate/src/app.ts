import * as Koa from 'koa'
import * as bodyparser from 'koa-bodyparser'

import { logger } from '@logger'
import { errorHandler } from './infra/http/error-middleware'
import { router as todoRouter } from './todo/router'

export const app = new Koa()

app.use(bodyparser())
app.use(errorHandler)
app.use(todoRouter.routes())

app.on('error', (reason: Error, ctx: Koa.Context) => {
  logger.error(
    reason,
    'An error happened at %s, response code:',
    ctx.request.url,
    ctx.status
  )
})
