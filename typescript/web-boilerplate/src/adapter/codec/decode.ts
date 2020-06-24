// adapters
import * as t from 'io-ts'
import { fold, either } from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/pipeable'
import { array } from 'fp-ts/lib/Array'
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
  return new Promise((resolve, reject) => {
    try {
      resolve(decode(validator)(input))
    } catch (error) {
      reject(error)
    }
  })
}

export function decode<T, O, I>(validator: t.Type<T, O, I>) {
  return function decode(input: I) {
    const result = validator.decode(input)
    return pipe(
      result,
      fold(
        () => {
          const messages = reporter(result)
          throw new DecodeError(messages.join('\n'))
        },
        value => value
      )
    )
  }
}

export function decodeSeq<T, O, I>(validator: t.Type<T, O, I>) {
  return function decodeSeq(input: Array<I>) {
    const result = array.traverse(either)(input, validator.decode)
    return pipe(
      result,
      fold(
        () => {
          const messages = reporter(result)
          throw new DecodeError(messages.join('\n'))
        },
        value => value
      )
    )
  }
}
