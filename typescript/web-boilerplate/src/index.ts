import 'module-alias/register'

import { app } from './app'
import { logger } from '@protocol/logger'

process
  .on('unhandledRejection', reason => {
    throw reason
  })
  .on('uncaughtException', reason => {
    logger.fatal(reason, 'Exiting application due to an uncaught exception')
    process.exit(1)
  })

const port = process.env.PORT || 3000
app.listen(port, () => logger.info('Application running on port %d', port))
