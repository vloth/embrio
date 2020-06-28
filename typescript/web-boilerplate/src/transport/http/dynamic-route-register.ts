/* eslint-disable @typescript-eslint/no-var-requires */
import path from 'path'
import Koa from 'koa'
import Router from 'koa-router'
import { logger } from '@protocol/logger'

export function registerRoutes(app: Koa, routes: Array<string>) {
  routes.forEach((route: string) => {
    try {
      const module = path.basename(path.dirname(route))
      const httpModule = require(route)

      if (!(httpModule.router instanceof Router))
        throw new RangeError(
          `${module} http module doesn't have a router (of koa-router) instance`
        )

      logger.info(
        'Registering %d routes from %s http module',
        httpModule.router.stack.length,
        module
      )

      app.use(httpModule.router.routes())
    } catch (err) {
      logger.error(
        `Cannot register http module for ${route} on application startup`
      )
    }
  })
}
