import { td, prepare } from '@test'
import type Koa from 'koa'
import type * as ModuleType from './dynamic-route-register'
import Router from 'koa-router'

const { load, replace } = prepare(__dirname)

suite('dynamic router')

const registerRoutes = load<typeof ModuleType>('./dynamic-route-register')
  .registerRoutes

test('should log error on mismatching router', async function () {
  const app = td.object<Koa>()

  registerRoutes(app, ['./routeA'])

  td.verify(this.logger.error(td.matchers.anything()))
})

test('should register routes in app', async function () {
  const app = td.object<Koa>()

  replace('./routeA', { router: new Router() })
  replace('./routeB', { router: new Router() })
  registerRoutes(app, ['./routeA', './routeB'])

  td.verify(app.use(td.matchers.isA(Function)), { times: 2 })
})
