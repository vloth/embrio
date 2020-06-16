import { Context } from 'koa'
import * as td from 'testdouble'
import { expect } from 'chai'

// Re-export some libs for simplification
export { td, expect }

// Builders
export const mock = {
  ctx: td.object<Context>()
}

// typed interface for td.when(...).thenReturn(...)
export function setup<T>(mock: T, mockedReturn: T) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  td.when(mock).thenReturn(mockedReturn as any)
}
