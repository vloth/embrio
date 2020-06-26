import { td, prepare, expect } from '@test'
import type * as StorageType from './storage.adapter'
import type * as UsecaseType from './usecase'

const { replace, load } = prepare(__dirname)

suite('todo use cases')

const storage = replace<typeof StorageType>('./storage.adapter')
const usecase = load<typeof UsecaseType>('./usecase')

test('mark pending task as done should update todo', async function () {
  const pendingtask = { id: 1, description: 'do the dishes', done: false }
  td.when(storage.get(pendingtask.id)).thenResolve(pendingtask)

  await usecase.markAsDone(pendingtask.id)

  td.verify(
    storage.update({
      ...pendingtask,
      done: true,
      date: td.matchers.isA(Date)
    })
  )
})

// eslint-disable-next-line max-len
test('mark an already completed task as done should fail', async function () {
  const completedtask = {
    id: 1,
    done: true,
    date: new Date(),
    description: 'do the dishes'
  }

  td.when(storage.get(completedtask.id)).thenResolve(completedtask)

  expect(usecase.markAsDone(completedtask.id)).to.be.rejected
})
