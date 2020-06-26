import { decode } from '@adapter/codec/decode'
import { identified } from '@adapter/id'
import * as core from './core.adapter'
import * as storage from './storage.adapter'

export async function markAsDone(id: number) {
  const todo = await storage.get(id).then(decode(identified(core.PendingTask)))
  const newTodo = { ...todo, done: true, date: new Date() }
  await storage.update(newTodo)
}
