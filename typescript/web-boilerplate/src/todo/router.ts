import * as Router from 'koa-router'
import { logger } from '@logger'

export const router = new Router({ prefix: '/api/todo' })

async function crash() {
  throw Error('WUT')
}

router
  .get('/', async ctx => {
    logger.info({ body: ctx.request.body }, 'processing body...')
    await crash()
    ctx.body = []
  })
  .post('/', ctx => {
    logger.info({ body: ctx.request.body }, 'processing body...')
    ctx.body = 'Hello from Koa ;)'
  })
