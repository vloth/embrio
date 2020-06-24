import { expect, mock, prepare } from '@test'
import type * as HttpType from './http.transport'
import type * as CoreType from './core.adapter'

const { replace, load, when } = prepare(__dirname)

suite('todo')

const coreAdapter = replace<typeof CoreType>('./core.adapter')
const http = load<typeof HttpType>('./http.transport')

test('mocked', () => {
  when(coreAdapter.isDue(null)).thenReturn(true)
  http.getTodo(mock.ctx)
  expect(mock.ctx.body).to.equal('foo')
})

test('UN-mocked', () => {
  http.getTodo(mock.ctx)
  expect(mock.ctx.body).to.equal('bar')
})
