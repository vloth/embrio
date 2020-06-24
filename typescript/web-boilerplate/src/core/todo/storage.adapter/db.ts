import * as Q from './sql/todo.queries'
import { Pool } from 'pg'
import { Todo } from '../Todo'
import { decodeSeq } from '@infra/codec/decode'

const pool = new Pool()

export const getAllTodos = () =>
  Q.getTodos.run({ done: false }, pool).then(decodeSeq(Todo))
