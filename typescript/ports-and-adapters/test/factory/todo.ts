import { factory } from '@test'
import { Id } from '@adapter/id'

export const base = factory<{ description: string; done: boolean }>(faker => ({
  done: faker.random.boolean(),
  description: faker.lorem.sentence()
}))

export const todoFactory = base.combine(
  factory<{ date: string }>(faker => ({
    date: faker.date.recent().toISOString()
  }))
)

export const todoDbFactory = base.combine(
  factory<{ id: Id; date: Date | null }>(faker => ({
    id: faker.random.number(),
    date: faker.date.recent()
  }))
)
