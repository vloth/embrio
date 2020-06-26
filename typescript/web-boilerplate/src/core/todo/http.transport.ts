import Router from 'koa-router'
import { decode } from '@adapter/codec/decode'
import { Id } from '@adapter/id'
import * as C from './core.adapter'
import * as S from './storage.adapter'
import * as U from './usecase'

export const router = new Router({ prefix: '/api/todo' })

router.get('/', async ctx => {
  const todos = await S.getAllTodos()
  ctx.ok(todos)
})

router.post('/', async ctx => {
  const todo = await decode(C.FutureTodo, ctx.request.body)
  const id = await S.addTodo(todo)
  ctx.created({ id })
})

router.patch('/:id/done', async ctx => {
  const id = await decode(Id, ctx.params.id)
  await U.markAsDone(id)
  ctx.ok()
})
