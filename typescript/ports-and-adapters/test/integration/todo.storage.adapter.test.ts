import { expect } from '@test'
import * as storage from '@core/todo/storage.adapter'

suite('todo storage adapter')

test('get all todos a', async function () {
  const id = await storage.addTodo({
    done: false,
    description: 'do the dishes'
  })
  expect(id).to.eql(1)
})

test('get all todos b', async function () {
  const id = await storage.addTodo({
    done: false,
    description: 'do the dishes'
  })
  expect(id).to.eql(1)
})
