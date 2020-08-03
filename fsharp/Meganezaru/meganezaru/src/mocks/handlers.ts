import { rest } from 'msw'

export const handlers = [
  rest.get('/bla', (_, res, ctx) => {
    return res(ctx.json({ success: true }))
  })
]
