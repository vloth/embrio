import 'module-alias/register'

import td from 'testdouble'
import chai from 'chai'
import promisedChai from 'chai-as-promised'

import type * as LoggerType from '@protocol/logger'

chai.use(promisedChai)

const loggerMock = td.object<typeof LoggerType>()
td.replace('@protocol/logger', loggerMock)

before(function () {
  this.logger = loggerMock.logger
})

afterEach(td.reset)
