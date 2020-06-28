import { expect } from '@test'
import * as core from './core.adapter'
import { decode } from '@adapter/codec/decode'

suite('todo core adapter')

const now = new Date()
const completedtask = {
  description: 'do the dishes',
  done: true,
  date: now.toISOString()
}

const pendingtask = {
  description: 'do the dishes',
  done: false
}

test('decode PendingTask', async function () {
  const decoded = decode(core.PendingTask, pendingtask)
  expect(decoded).to.eql(pendingtask)
})

test('decode CompletedTask', async function () {
  const decoded = decode(core.CompletedTask, completedtask)
  expect(decoded).to.eql({ ...completedtask, date: now })
})

test('decode Todo', async function () {
  const completedTaskDecoded = decode(core.Todo, completedtask)
  const pendingTaskDecoded = decode(core.Todo, pendingtask)

  expect(pendingTaskDecoded).to.eql(pendingtask)
  expect(completedTaskDecoded).to.eql({ ...completedtask, date: now })
})
