import { pool } from '@protocol/pg'
import { head } from 'ramda'
import * as Q from './sql/todo.queries'
import * as A from '../core.adapter'

export const getAllTodos = () => Q.getTodos.run(undefined, pool())

export const get = (id: number) => Q.get.run({ id }, pool()).then(head)

export const update = (todo: A.Identified<A.Todo>) =>
  Q.update.run({ duedate: null, ...todo }, pool())

export const addTodo = async (todo: A.FutureTodo): Promise<number> => {
  const result = head(await Q.addTodo.run({ todo }, pool()))
  if (!result) throw ReferenceError('result of #addTodo is empty')
  return result.id
}
