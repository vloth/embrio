import * as t from 'io-ts'
import { DateFromISOString } from 'io-ts-types/lib/DateFromISOString'

const DueTodo = t.type({
  description: t.string,
  done: t.literal(true),
  due: DateFromISOString
})

const FutureTodo = t.type({
  description: t.string,
  done: t.literal(false)
})

const Todo = t.readonly(t.union([FutureTodo, DueTodo]))

type DueTodo = t.TypeOf<typeof DueTodo>
type FutureTodo = t.TypeOf<typeof FutureTodo>
type Todo = t.TypeOf<typeof Todo>

const isDue = (todo: Todo): todo is DueTodo => todo.done

export { Todo, DueTodo, FutureTodo, isDue }
