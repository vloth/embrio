import { expect, td, mock } from '@test'
import * as RouterModule from './router'
import * as TodoModule from './Todo'

suite('todo')

const Todo: typeof TodoModule = td.replace('./Todo')
const router: typeof RouterModule = require('./router')

test('mocked', () => {
  td.when(Todo.isDue(null)).thenReturn(true)
  router.getTodo(mock.ctx)
  expect(mock.ctx.body).to.equal('foo')
})

test('UN-mocked', () => {
  router.getTodo(mock.ctx)
  expect(mock.ctx.body).to.equal('bar')
})
