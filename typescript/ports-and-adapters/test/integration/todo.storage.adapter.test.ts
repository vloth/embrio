import { expect } from '@test'
import * as storage from '../../src/core/todo/storage.adapter'

suite('todo storage adapter')

test('get all todos', async function () {
  const id = await storage.addTodo({
    done: false,
    description: 'do the dishes'
  })
  expect(id).to.eql(1)
})
