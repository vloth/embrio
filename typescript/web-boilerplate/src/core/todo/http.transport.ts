import * as Router from 'koa-router'
import { decode } from '@adapter/codec/decode'
import * as core from './core.adapter'
import { getAllTodos } from './storage.adapter'

export const router = new Router({ prefix: '/api/todo' })

router.get('/', async ctx => {
  ctx.body = await getAllTodos()
})

router.post('/', async ctx => {
  const todo = await decode(core.FutureTodo, ctx.request.body)
  const doneTodo = core.markAsDone(todo)
  ctx.body = doneTodo
})
