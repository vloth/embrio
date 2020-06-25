import { pool } from '@protocol/pg'
import * as Q from './sql/todo.queries'
import * as C from '../core.adapter'

export const getAllTodos = () => Q.getTodos.run({ done: false }, pool())

export const addTodo = async (todo: C.FutureTodo): Promise<number> => {
  const result = await Q.addTodo.run({ todo }, pool())
  return result[0].id
}
