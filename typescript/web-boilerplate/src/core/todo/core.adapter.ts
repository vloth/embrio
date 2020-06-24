import * as t from 'io-ts'
import { DateFromISOString } from 'io-ts-types/lib/DateFromISOString'
import { date } from 'io-ts-types/lib/date'
import { HexId } from '@adapter/HexId'

export const DueTodo = t.type({
  id: HexId,
  description: t.string,
  done: t.literal(true),
  duedate: t.union([DateFromISOString, date])
})

export const FutureTodo = t.type({
  id: HexId,
  description: t.string,
  done: t.literal(false)
})

export const Todo = t.readonly(t.union([FutureTodo, DueTodo]))

export type DueTodo = t.TypeOf<typeof DueTodo>
export type FutureTodo = t.TypeOf<typeof FutureTodo>
export type Todo = t.TypeOf<typeof Todo>

export const isDue = (todo: Todo | null): todo is DueTodo =>
  todo != null && todo.done
