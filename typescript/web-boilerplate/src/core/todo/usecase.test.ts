import { td, prepare, expect } from '@test'
import type * as Stype from './storage.adapter'
import type * as Utype from './usecase'

const { replace, load } = prepare(__dirname)

suite('todo interactor')

const S = replace<typeof Stype>('./storage.adapter')
const U = load<typeof Utype>('./usecase')

test('mark todo as done', async function () {
  const todo = { id: 1, description: 'do the dishes', done: false }
  td.when(S.get(todo.id)).thenResolve(todo)

  await U.markAsDone(todo.id)

  td.verify(S.update({ ...todo, done: true, duedate: td.matchers.isA(Date) }))
})

// eslint-disable-next-line max-len
test('mark todo as done should fail when todo is already done', async function () {
  const todo = {
    id: 1,
    done: true,
    duedate: new Date(),
    description: 'do the dishes'
  }

  td.when(S.get(todo.id)).thenResolve(todo)

  expect(U.markAsDone(todo.id)).to.be.rejected
})
