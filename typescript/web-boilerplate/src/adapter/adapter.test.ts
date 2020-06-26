import { expect, prepare } from '@test'
import { decode } from '@adapter/codec/decode'
import { identified } from '@adapter/id'
import type * as Env from '@adapter/env'
import * as t from 'io-ts'

suite('adapter id')

const identifiedVoid = decode(identified(t.type({})))

;[123, '123'].forEach(async n => {
  test('identified void should decode input', async function () {
    expect(await identifiedVoid({ id: n })).to.eql({ id: 123 })
  })
})
;[-123, 'foobar'].forEach(async n => {
  test('identified void should not decode input', async function () {
    expect(identifiedVoid({ id: n })).to.be.rejected
  })
})

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
