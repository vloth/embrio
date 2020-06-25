import { Context, Next } from 'koa'
import { isDecodeError } from '@adapter/codec/decode'

export async function errorHandler(ctx: Context, next: Next) {
  try {
    await next()
  } catch (err) {
    ctx.body = err.message

    if (isDecodeError(err)) {
      ctx.status = 400
      return
    }

    ctx.status = 500
    ctx.app.emit('error', err, ctx)
  }
}
