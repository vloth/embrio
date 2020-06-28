import type * as LoggerModule from '@protocol/logger'

declare module 'mocha' {
  interface Context {
    logger: typeof LoggerModule['logger']
  }
}
