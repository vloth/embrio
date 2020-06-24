import { expect, td, mock } from '@test'
import type * as RouterModule from './http.transport'
import type * as TodoModule from './core.adapter'

suite('todo')

/*
console.time('td-mock')
const Todo: typeof TodoModule = td.replace(
  './core.adapter',
  td.object<typeof RouterModule>()
)
console.timeEnd('td-mock')
*/
///*
console.time('td-mock')
const Todo: typeof TodoModule = td.replace('./core.adapter')
console.timeEnd('td-mock')
//*/

const router: typeof RouterModule = require('./http.transport')

test('mocked', () => {
  td.when(Todo.isDue(null)).thenReturn(true)
  router.getTodo(mock.ctx)
  expect(mock.ctx.body).to.equal('foo')
})

test('UN-mocked', () => {
  router.getTodo(mock.ctx)
  expect(mock.ctx.body).to.equal('bar')
})
