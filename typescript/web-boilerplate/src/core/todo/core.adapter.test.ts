import { expect, factory } from '@test'
import * as core from './core.adapter'
import { decode } from '@adapter/codec/decode'
import { omit } from 'ramda'

suite('todo core adapter')

type UnknownTodo = { date: string; description: string; done: boolean }
const todoFactory = factory<UnknownTodo>(faker => ({
  date: faker.date.recent().toISOString(),
  description: faker.lorem.sentence(),
  done: true
}))

const [completedtask, pendingtask] = [
  todoFactory.build(),
  omit(['date'], todoFactory.build({ done: false }))
]

test('decode PendingTask', async function () {
  const decoded = decode(core.PendingTask, pendingtask)
  expect(decoded).to.eql(pendingtask)
})

test('decode CompletedTask', async function () {
  const decoded = decode(core.CompletedTask, completedtask)
  expect(decoded).to.eql({
    ...completedtask,
    date: new Date(completedtask.date)
  })
})

test('decode Todo', async function () {
  const completedTaskDecoded = decode(core.Todo, completedtask)
  const pendingTaskDecoded = decode(core.Todo, pendingtask)

  expect(pendingTaskDecoded).to.eql(pendingtask)
  expect(completedTaskDecoded).to.eql({
    ...completedtask,
    date: new Date(completedtask.date)
  })
})
