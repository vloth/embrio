import 'module-alias/register'

import { app } from './app'
import { logger } from '@infra/logger'

process
  .on('unhandledRejection', (reason: string) => {
    throw reason
  })
  .on('uncaughtException', (reason: Error) => {
    logger.fatal(reason, 'Exiting application due to an uncaught exception')
    process.exit(1)
  })

const port = process.env.PORT || 3000
app.listen(port, () => logger.info('Application running on port %d', port))
