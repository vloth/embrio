import { rest } from 'msw'

export const handlers = [
  rest.get('/api/me', function (_, res, ctx) {
    return res(
      ctx.status(200),
      ctx.json({
        picture: 'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9',
        name: 'Richard John Doe',
        vacancy: 'junior architect, at OWL',
        location: 'Amsterdam, North Holland',
        phone: '+31 06 1234-5678'
      })
    )
  })
]
