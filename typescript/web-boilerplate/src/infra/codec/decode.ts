import * as t from 'io-ts'
import { fold } from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/pipeable'
import { reporter } from 'io-ts-reporters'

export class DecodeError extends Error {
  constructor(message: string) {
    super(message)
    Object.setPrototypeOf(this, new.target.prototype)
  }
}

export function decodeP<T, O, I>(
  validator: t.Type<T, O, I>,
  input: I
): Promise<T> {
  const result = validator.decode(input)
  return pipe(
    result,
    fold(
      () => {
        const messages = reporter(result)
        return Promise.reject(new DecodeError(messages.join('\n')))
      },
      value => Promise.resolve(value)
    )
  )
}
