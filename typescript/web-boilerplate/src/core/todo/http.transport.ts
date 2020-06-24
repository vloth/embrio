import { Context } from 'koa'
import * as Router from 'koa-router'
import { decodeP } from '@adapter/codec/decode'
import { logger } from '@protocol/logger'
import { Todo, isDue } from './core.adapter'
import { newId } from '@adapter/HexId'

export const router = new Router()
  .get('/api/todo', getTodo)
  .post('/api/todo', postTodo)

export function getTodo(ctx: Context) {
  if (isDue(null)) {
    ctx.body = newId()
    return
  }
  ctx.body = 'bar'
}

async function postTodo(ctx: Context) {
  const todo = await decodeP(Todo, ctx.request.body)
  const isIdEqual = todo.id.equals(todo.id)
  console.log('qual: ', isIdEqual)
  if (isDue(todo)) {
    logger.info({ when: todo.duedate.getFullYear() }, 'due todo')
  } else {
    logger.info('not due, %s', todo.description)
  }
  ctx.body = todo
}
