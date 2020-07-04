import type Koa from 'koa'
import type * as ModuleType from './dynamic-route-register'
import Router from 'koa-router'

suite('dynamic router')

const { load, mock } = prepare(__dirname)
const registerRoutes = load<typeof ModuleType>('./dynamic-route-register')
  .registerRoutes

test('log error on mismatching router', async function () {
  const app = td.object<Koa>()

  expect(() => registerRoutes(app, ['./routeA'])).to.throw()
})

test('register routes in app', async function () {
  const app = td.object<Koa>()

  mock('./routeA', { router: new Router() })
  mock('./routeB', { router: new Router() })
  registerRoutes(app, ['./routeA', './routeB'])

  td.verify(app.use(td.matchers.isA(Function)), { times: 2 })
})

test('log error on invalid router structure', async function () {
  const app = td.object<Koa>()

  mock('./routeA', { router: { foo: 'bar' } })

  expect(() => registerRoutes(app, ['./routeA'])).to.throw()
})
