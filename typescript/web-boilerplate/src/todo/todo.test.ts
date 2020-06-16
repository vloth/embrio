import { expect, td, setup, mock } from '@test'
import * as RouterModule from './router'
import * as TodoModule from './Todo'

const Todo: typeof TodoModule = td.replace('./Todo')
const router: typeof RouterModule = require('./router')

suite('todo')

test('mocked', () => {
  setup(Todo.isDue(null), true)
  router.getTodo(mock.ctx)
  expect(mock.ctx.body).to.equal('foo')
})

test('UN-mocked', () => {
  router.getTodo(mock.ctx)
  expect(mock.ctx.body).to.equal('bar')
})
