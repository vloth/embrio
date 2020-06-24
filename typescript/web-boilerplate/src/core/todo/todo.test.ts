import { expect, mock, prepare } from '@test'
import type * as RouterModule from './http.transport'
import type * as TodoCoreAdapter from './core.adapter'

const { replace, load, when } = prepare(__dirname)

suite('todo')

const Todo = replace<typeof TodoCoreAdapter>('./core.adapter')
const router = load<typeof RouterModule>('./http.transport')

test('mocked', () => {
  when(Todo.isDue(null)).thenReturn(true)
  router.getTodo(mock.ctx)
  expect(mock.ctx.body).to.equal('foo')
})

test('UN-mocked', () => {
  router.getTodo(mock.ctx)
  expect(mock.ctx.body).to.equal('bar')
})
