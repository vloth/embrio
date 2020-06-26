import 'module-alias/register'

import td from 'testdouble'
import chai from 'chai'
import promisedChai from 'chai-as-promised'

chai.use(promisedChai)

afterEach(td.reset)
