/* eslint-disable @typescript-eslint/no-explicit-any */
import td from 'testdouble'
import { expect } from 'chai'
import { join } from 'path'

// Re-export some libs for simplification
export { td, expect }

export const mock = <T>(
  expression: T,
  example: T extends Promise<unknown> ? never : T
) => td.when(expression).thenReturn(example as any)

export const mockAsync = <T>(
  expression: T,
  example: T extends Promise<infer R> ? R : never
) => td.when(expression).thenResolve(example as any)

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
