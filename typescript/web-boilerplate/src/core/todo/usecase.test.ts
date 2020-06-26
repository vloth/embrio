import { td, prepare, expect } from '@test'
import type * as Stype from './storage.adapter'
import type * as Utype from './usecase'

const { replace, load } = prepare(__dirname)

suite('todo use cases')

const S = replace<typeof Stype>('./storage.adapter')
const U = load<typeof Utype>('./usecase')

test('mark pending task as done should update todo', async function () {
  const pendingtask = { id: 1, description: 'do the dishes', done: false }
  td.when(S.get(pendingtask.id)).thenResolve(pendingtask)

  await U.markAsDone(pendingtask.id)

  td.verify(
    S.update({ ...pendingtask, done: true, duedate: td.matchers.isA(Date) })
  )
})

// eslint-disable-next-line max-len
test('mark an already completed task as done should fail', async function () {
  const completedtask = {
    id: 1,
    done: true,
    duedate: new Date(),
    description: 'do the dishes'
  }

  td.when(S.get(completedtask.id)).thenResolve(completedtask)

  expect(U.markAsDone(completedtask.id)).to.be.rejected
})
