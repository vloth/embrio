import { pool } from '@protocol/pg'
import * as Q from './sql/todo.queries'

export const getAllTodos = () => Q.getTodos.run({ done: false }, pool())
