import { prepare } from '@test'
import type * as Stype from './storage.adapter'
import type * as Itype from './interactor'

const { replace, load, td } = prepare(__dirname)

suite('todo interactor')

const S = replace<typeof Stype>('./storage.adapter')
const I = load<typeof Itype>('./interactor')

test('mark todo as done', async function () {
  const todo = {
    id: 1,
    description: 'do the dishes',
    done: false
  }

  td.when(S.get(todo.id)).thenResolve(todo)

  await I.markAsDone(todo.id)

  td.verify(
    S.update({
      ...todo,
      duedate: new Date(),
      done: true
    })
  )
})
