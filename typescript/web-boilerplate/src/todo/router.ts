import { Context } from 'koa'
import * as Router from 'koa-router'
import { decodeP } from '@infra/codec/decode'
import { logger } from '@infra/logger'
import { Todo, isDue } from './Todo'

export const router = new Router({ prefix: '/api/todo' })
  .get('/', getTodo)
  .post('/', postTodo)

async function getTodo(ctx: Context) {
  async function crash() {
    throw Error('WUT')
  }
  logger.info({ body: ctx.request.body }, 'processing body...')
  await crash()
  ctx.body = []
}

async function postTodo(ctx: Context) {
  const todo = await decodeP(Todo, ctx.request.body)
  if (isDue(todo)) {
    logger.info({ when: todo.due.getFullYear() }, 'due todo')
  }
  ctx.body = todo
}
