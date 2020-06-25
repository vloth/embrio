import 'module-alias/register'

import { app } from './app'
import { env } from '@adapter/env'
import { logger } from '@protocol/logger'

process
  .on('unhandledRejection', reason => {
    throw reason
  })
  .on('uncaughtException', reason => {
    logger.fatal(reason, 'Exiting application due to an uncaught exception')
    process.exit(1)
  })

app.listen(env.port, () =>
  logger.info('Application running on port %d', env.port)
)
