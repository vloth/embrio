import * as t from 'io-ts'
import { isLeft } from 'fp-ts/lib/Either'
import { IntFromString } from 'io-ts-types/lib/IntFromString'
import { DecodeError } from './codec/decode'

const Env = t.readonly(
  t.readonly(
    t.type({
      port: IntFromString
    })
  )
)

type Env = t.TypeOf<typeof Env>

type UnsafeEnv = { [P in keyof Required<Env>]: string | undefined }

function decodeEnvironment(unsafeEnv: UnsafeEnv) {
  const eitherEnv = Env.decode(unsafeEnv)
  if (isLeft(eitherEnv)) throw new DecodeError(eitherEnv)
  return eitherEnv.right
}

// ⚠ !DANGER!
// side-effect runs when this file is imported
export const env = decodeEnvironment({
  port: process.env.PORT
})
