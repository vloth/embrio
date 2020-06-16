import { Context } from 'koa'
import * as Router from 'koa-router'
import { decodeP } from '@infra/codec/decode'
import { logger } from '@infra/logger'
import { Todo, isDue } from './Todo'

export const router = new Router({ prefix: '/api/todo' })
  .get('/', getTodo)
  .post('/', postTodo)

export function getTodo(ctx: Context) {
  if (isDue(null)) {
    ctx.body = 'foo'
    return
  }
  ctx.body = 'bar'
}

async function postTodo(ctx: Context) {
  const todo = await decodeP(Todo, ctx.request.body)
  if (isDue(todo)) {
    logger.info({ when: todo.due.getFullYear() }, 'due todo')
  }
  ctx.body = todo
}
