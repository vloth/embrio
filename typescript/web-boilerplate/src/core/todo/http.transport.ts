import Router from 'koa-router'
import { NumberFromString } from 'io-ts-types/lib/NumberFromString'
import { decode } from '@adapter/codec/decode'
import * as A from './core.adapter'
import * as S from './storage.adapter'
import * as I from './interactor'

export const router = new Router({ prefix: '/api/todo' })

router.get('/', async ctx => {
  ctx.ok(await S.getAllTodos())
})

router.post('/', async ctx => {
  const todo = await decode(A.FutureTodo, ctx.request.body)
  const id = await S.addTodo(todo)
  ctx.created({ id })
})

router.patch('/:id/done', async ctx => {
  await decode(NumberFromString, ctx.params.id).then(I.markAsDone)
  ctx.ok()
})
