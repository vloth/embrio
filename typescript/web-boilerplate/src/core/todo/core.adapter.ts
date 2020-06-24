import * as t from 'io-ts'
import { DateFromISOString } from 'io-ts-types/lib/DateFromISOString'
import { date } from 'io-ts-types/lib/date'
import { ObjectID } from 'mongodb'

type CustomId = Omit<ObjectID, keyof ObjectID> & {
  equals: (other: CustomId) => boolean
}

const CustomIdFromString = new t.Type<CustomId, string, unknown>(
  'CustomIdFromString',
  (u): u is CustomId => ObjectID.isValid(u as string),
  (u: any, c: any) =>
    !ObjectID.isValid(u as string)
      ? t.failure(u, c, 'invalid custom id')
      : t.success((new ObjectID(u) as unknown) as CustomId),
  String
)

export const DueTodo = t.type({
  id: CustomIdFromString,
  description: t.string,
  done: t.literal(true),
  duedate: t.union([DateFromISOString, date])
})

export const FutureTodo = t.type({
  id: CustomIdFromString,
  description: t.string,
  done: t.literal(false)
})

export const Todo = t.readonly(t.union([FutureTodo, DueTodo]))

export type DueTodo = t.TypeOf<typeof DueTodo>
export type FutureTodo = t.TypeOf<typeof FutureTodo>
export type Todo = t.TypeOf<typeof Todo>

export const isDue = (todo: Todo | null): todo is DueTodo =>
  todo != null && todo.done
