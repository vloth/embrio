import * as t from 'io-ts'
import { IntFromString } from 'io-ts-types/lib/IntFromString'
import { decode } from './codec/decode'

const Env = t.readonly(
  t.strict({
    port: IntFromString
  })
)

type Env = t.TypeOf<typeof Env>
type UnsafeEnv = { [P in keyof Required<Env>]: string | undefined }
const decodeEnv = (unsafeEnv: UnsafeEnv) => decode(Env, unsafeEnv)

// ⚠ !DANGER!
// side-effect runs when this file is imported
export const env = decodeEnv({
  port: process.env.PORT
})
