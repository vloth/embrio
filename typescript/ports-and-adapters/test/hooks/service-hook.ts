import * as td from 'testdouble'
import * as tc from 'testcontainers'
import type * as EnvAdapterType from '@adapter/env'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as DBMigrate from 'db-migrate'

type DbConfig = typeof EnvAdapterType['env']['db']
if (String(process.env.EXT_SERVICE) === 'true') {
  const env = {} as typeof EnvAdapterType['env']
  td.replace('@adapter/env', { env })

  let container: tc.StartedTestContainer
  before(async function () {
    console.time('hook')
    this.timeout(10 * 1000)
    const [kontainer, db] = await startPgContainer()
    container = kontainer

    Object.assign(env, { port: 0, db })

    await runMigrations(db)
    console.timeEnd('hook')
  })

  after(async function () {
    this.timeout(15 * 1000)
    console.time('end')
    await container?.stop()
    console.timeEnd('end')
  })
}

async function startPgContainer(): Promise<
  [tc.StartedTestContainer, DbConfig]
> {
  console.time('pg')
  const container = await new tc.GenericContainer('postgres')
    .withEnv('POSTGRES_PASSWORD', 'postgres')
    .withEnv('POSTGRES_USER', 'postgres')
    .withEnv('POSTGRES_DB', 'my-app')
    .withExposedPorts(5432)
    .start()

  const db = {
    host: container.getContainerIpAddress(),
    port: container.getMappedPort(5432),
    password: 'postgres',
    user: 'postgres',
    database: 'my-app'
  }

  console.timeEnd('pg')
  return [container, db]
}

async function runMigrations(db: DbConfig) {
  console.time('migration')
  const option = { driver: 'pg', ...db }
  const dbm = DBMigrate.getInstance(true, {
    env: 'test',
    config: { test: option }
  })
  dbm.silence(true)
  await dbm.registerAPIHook()
  await dbm.up()
  console.timeEnd('migration')
}
