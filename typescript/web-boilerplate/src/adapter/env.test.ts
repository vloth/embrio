import { expect, prepare } from '@test'
import type * as Env from '@adapter/env'

suite('adapter env')

const { load } = prepare(__dirname)
const env = { ...process.env }

afterEach(function () {
  process.env = env
  delete require.cache[require.resolve('@adapter/env')]
})

test('env adapter should decode env', function () {
  process.env.PORT = '3000'
  const mod = load<typeof Env>('@adapter/env')
  expect(mod.env.port).to.eql(3000)
})

test('env adapter should throw exception if env is not set up', function () {
  process.env.PORT = 'three thousand'
  expect(() => load<typeof Env>('@adapter/env')).to.throw()
})
