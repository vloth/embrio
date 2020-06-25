import * as t from 'io-ts'
import { ObjectID } from 'mongodb'

type HexId = Omit<ObjectID, keyof ObjectID> & {
  equals: (other: HexId) => boolean
}

export const newId = () => (new ObjectID() as unknown) as HexId

export const HexId = new t.Type<HexId, string, unknown>(
  'HexId',
  (u): u is HexId => ObjectID.isValid(u as string),
  (u: any, c: any) =>
    !ObjectID.isValid(u as string)
      ? t.failure(u, c, 'invalid custom id')
      : t.success((new ObjectID(u) as unknown) as HexId),
  String
)
