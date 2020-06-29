/* eslint-disable @typescript-eslint/no-explicit-any */
import td from 'testdouble'
import { expect } from 'chai'
import { join } from 'path'
import * as Factory from 'factory.ts'
import * as Faker from 'faker'

// Re-export some libs for simplification
const { verify, matchers } = td
export { expect, td, verify, matchers }

type PromiseResult<T> = T extends Promise<infer U> ? U : T
type NonNullable<T> = Exclude<T, null | undefined>
type FuncOrValue<T> = T extends (...args: any) => any
  ? NonNullable<PromiseResult<ReturnType<T>>>
  : NonNullable<T>

export function factory<T>(
  f: (
    faker: typeof Faker,
    each: typeof Factory.each
  ) => Factory.Builder<FuncOrValue<T>>
): Factory.Factory<FuncOrValue<T>> {
  return Factory.Sync.makeFactory(f(Faker, Factory.Sync.each) as any) as any
}

// infer api from type system
export function calling<T>(
  expression: T
): T extends Promise<infer R>
  ? { resolves: (r: R) => void }
  : { returns: (t: T) => void } {
  return {
    returns(t: T) {
      td.when(expression).thenReturn(t as any)
    },
    resolves(r: unknown) {
      td.when(expression).thenResolve(r as any)
    }
  } as any
}

// typed td api
export function prepare(basepath: string) {
  return {
    replace<T>(path: string, mockedModule = td.object<T>()): T {
      return td.replace(join(basepath, path), mockedModule)
    },
    load<T>(path: string): T {
      if (path.startsWith('@')) return require(path)
      return require(join(basepath, path))
    }
  }
}
