import 'module-alias/register'

import td from 'testdouble'
import chai from 'chai'
import promisedChai from 'chai-as-promised'

import type * as LoggerModule from '@protocol/logger'

chai.use(promisedChai)

// global mocks
const loggerMock = td.object<typeof LoggerModule>()
td.replace('@protocol/logger', loggerMock)

before(function () {
  this.logger = loggerMock.logger
})

afterEach(td.reset)
