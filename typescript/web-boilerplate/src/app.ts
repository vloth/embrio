import * as Koa from 'koa'
import * as bodyparser from 'koa-bodyparser'
import { logger } from '@logger'

export const app = new Koa()

app.use(bodyparser())

async function crash() {
  throw Error('blah')
}

app.use(async ctx => {
  logger.info({ body: ctx.request.body }, 'processing body...')
  crash()
  ctx.body = 'Hello from Koa ;)'
})
