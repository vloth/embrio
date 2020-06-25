// import deepEqual from 'deep-equal'
import * as t from 'io-ts'
import * as E from 'fp-ts/lib/Either'
import { reporter } from 'io-ts-reporters'

/**
 * Creates a function which takes incoming values and decodes them
 * with the given io-ts type,
 * returning a promise reflecting the result.
 *
 * @param type io-ts type to use for decoding incoming values.
 */
export function decode<Output, Input>(
  type: t.Decoder<Input, Output>
): (value: Input) => Promise<Output>
/**
 * Decodes values using io-ts types, returning a promise reflecting the result.
 *
 * @param type io-ts type to use for decoding the value.
 * @param value Value to decode using the given io-ts type.
 */
export function decode<Output, Input>(
  type: t.Decoder<Input, Output>,
  value: Input
): Promise<Output>
export function decode<Output, Input>(
  type: t.Decoder<Input, Output>,
  value?: Input
): ((value: Input) => Promise<Output>) | Promise<Output> {
  switch (arguments.length) {
    case 0:
      throw new Error('Function called with no arguments')
    case 1:
      return decode.bind<
        null,
        t.Decoder<Input, Output>,
        [Input],
        Promise<Output>
      >(null, type)
    default:
      // eslint-disable-next-line no-case-declarations, prefer-rest-params
      const result = type.decode(value || arguments[1])
      return E.fold<t.Errors, Output, Promise<Output>>(
        () => Promise.reject(new DecodeError(result)),
        decodedValue => Promise.resolve(decodedValue)
      )(result)
  }
}

/**
 * Checks whether error was produced by @see decode due to invalid data.
 */
export function isDecodeError(error: unknown): error is DecodeError {
  return error instanceof DecodeError
}

/**
 * Custom error class which is rejected by the @see decode function
 * when decoding fails due to invalid data.
 */
export class DecodeError extends Error {
  public name = 'DecodeError'

  constructor(either: E.Either<t.Errors, unknown>) {
    super(DecodeError.getErrorMessage(either))
    Object.setPrototypeOf(this, DecodeError.prototype)
  }

  private static getErrorMessage(either: E.Either<t.Errors, unknown>) {
    return `Cannot decode environment: ${reporter(either).join('\n')}`
  }
}
