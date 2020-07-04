import { td, prepare, expect } from '@test'
import type Koa from 'koa'
import type * as ModuleType from './dynamic-route-register'
import Router from 'koa-router'

const { load, replace } = prepare(__dirname)

suite('dynamic router')

const registerRoutes = load<typeof ModuleType>('./dynamic-route-register')
  .registerRoutes

test('log error on mismatching router', async function () {
  const app = td.object<Koa>()

  expect(() => registerRoutes(app, ['./routeA'])).to.throw()
})

test('register routes in app', async function () {
  const app = td.object<Koa>()

  replace('./routeA', { router: new Router() })
  replace('./routeB', { router: new Router() })
  registerRoutes(app, ['./routeA', './routeB'])

  td.verify(app.use(td.matchers.isA(Function)), { times: 2 })
})

test('log error on invalid router structure', async function () {
  const app = td.object<Koa>()

  replace('./routeA', { router: { foo: 'bar' } })

  expect(() => registerRoutes(app, ['./routeA'])).to.throw()
})
