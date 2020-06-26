import * as t from 'io-ts'
import { DateFromISOString } from 'io-ts-types/lib/DateFromISOString'
import { date } from 'io-ts-types/lib/date'

export const DueTodo = t.readonly(
  t.strict({
    description: t.string,
    done: t.literal(true),
    duedate: t.union([DateFromISOString, date])
  })
)

export const FutureTodo = t.readonly(
  t.strict({
    description: t.string,
    done: t.literal(false)
  })
)

export const Todo = t.union([FutureTodo, DueTodo])

export type DueTodo = t.TypeOf<typeof DueTodo>
export type FutureTodo = t.TypeOf<typeof FutureTodo>
export type Todo = t.TypeOf<typeof Todo>
