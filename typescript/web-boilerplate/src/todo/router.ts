import * as Router from 'koa-router'
import { decodeP } from '../infra/codec/decode'
import { Todo, isDue } from './Todo'
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
  .post('/', async ctx => {
    const todo = await decodeP(Todo, ctx.request.body)
    if (isDue(todo)) {
      logger.info({ when: todo.due.getFullYear() }, 'due todo')
    }
    ctx.body = todo
  })
