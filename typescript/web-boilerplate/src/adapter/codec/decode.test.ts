import { expect } from '@test'
import { decode } from '@adapter/codec/decode'
import * as t from 'io-ts'

suite('adapter decoder')

test('decode unknown object correctly', async function () {
  const result = await decode(t.number, 123)
  expect(result).to.eql(123)
})

test('curried decode decodes unknown object correctly', async function () {
  const result = await decode(t.number)(123)
  expect(result).to.eql(123)
})

test('reject unknown object on failure', async function () {
  expect(decode(t.number, '123')).to.be.rejected
})

test('curried decode rejects unknown object on failure', async function () {
  expect(decode(t.number)('123')).to.be.rejected
})
