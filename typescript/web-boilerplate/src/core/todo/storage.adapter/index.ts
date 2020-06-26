import { head } from 'ramda'
import { pool } from '@protocol/pg'
import { Identified, Id } from '@adapter/id'
import * as query from './sql/todo.queries'
import * as core from '../core.adapter'

export const getAllTodos = () => query.getTodos.run(undefined, pool())

export const get = (id: Id) => query.get.run({ id }, pool()).then(head)

export const update = (todo: Identified<core.Todo>) =>
  query.update.run({ duedate: null, ...todo }, pool())

export const addTodo = async (todo: core.FutureTodo): Promise<number> => {
  const result = head(await query.addTodo.run({ todo }, pool()))
  if (!result) throw ReferenceError('result of #addTodo is empty')
  return result.id
}
