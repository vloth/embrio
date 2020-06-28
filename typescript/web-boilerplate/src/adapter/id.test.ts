import { expect } from '@test'
import { decode } from '@adapter/codec/decode'
import { identified } from '@adapter/id'
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
