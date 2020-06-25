import { decode } from '@adapter/codec/decode'
import * as A from './core.adapter'
import * as S from './storage.adapter'

export async function markAsDone(id: number) {
  const todo = await S.get(id).then(decode(A.identified(A.FutureTodo)))
  const newTodo = { ...todo, done: true, duedate: new Date() }
  await S.update(newTodo)
}
