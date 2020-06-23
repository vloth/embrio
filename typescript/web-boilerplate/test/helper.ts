import { Context } from 'koa'
import * as td from 'testdouble'
import { expect } from 'chai'

// Re-export some libs for simplification
export { td, expect }

// Built-in mocks
export const mock = {
  ctx: td.object<Context>()
}
