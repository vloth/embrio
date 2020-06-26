import td from 'testdouble'
import { Context } from 'koa'
import { expect } from 'chai'
import { join } from 'path'

// Re-export some libs for simplification
export { td, expect }

// Built-in mocks
export const mock = {
  ctx: td.object<Context>()
}

// typed td api
export function prepare(basepath: string) {
  return {
    replace<T>(path: string): T {
      return td.replace(join(basepath, path), td.object<T>())
    },
    load<T>(path: string): T {
      if (path.startsWith('@')) return require(path)
      return require(join(basepath, path))
    }
  }
}
