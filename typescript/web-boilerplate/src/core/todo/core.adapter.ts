import * as t from 'io-ts'
import { DateFromISOString } from 'io-ts-types/lib/DateFromISOString'
import { date } from 'io-ts-types/lib/date'
import { HexId } from '@adapter/hex-id'

export const DueTodo = t.readonly(
  t.type({
    id: HexId,
    description: t.string,
    done: t.literal(true),
    duedate: t.union([DateFromISOString, date])
  })
)

export const FutureTodo = t.readonly(
  t.type({
    id: HexId,
    description: t.string,
    done: t.literal(false)
  })
)

/*
declare function pick<O, K extends keyof O>(o: O, keys: Array<K>): Pick<O, K>
const e = pick(DueTodo.type.props, ['description'])
const BarT = t.readonly(t.type(e))
export type BarT = t.TypeOf<typeof BarT>
const a: BarT = { description: 'akds' }
a.description = ''
*/

export const Todo = t.union([FutureTodo, DueTodo])

export type DueTodo = t.TypeOf<typeof DueTodo>
export type FutureTodo = t.TypeOf<typeof FutureTodo>
export type Todo = t.TypeOf<typeof Todo>

export const isDue = (todo: Todo): todo is DueTodo => todo != null && todo.done

export const markAsDone = (futureTodo: FutureTodo) =>
  ({
    ...futureTodo,
    done: true,
    duedate: new Date()
  } as DueTodo)
