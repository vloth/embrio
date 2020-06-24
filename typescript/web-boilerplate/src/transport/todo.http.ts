import { Context } from 'koa'
import * as Router from 'koa-router'
import { decodeP } from '@infra/codec/decode'
import { logger } from '@infra/logger'
import { Todo, isDue } from './Todo'
import { getAllTodos } from './adapter/db'

export const router = new Router()
  .get('/api/todo', getTodo)
  .post('/api/todo', postTodo)

export async function getTodo(ctx: Context) {
  ctx.body = await getAllTodos()
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
