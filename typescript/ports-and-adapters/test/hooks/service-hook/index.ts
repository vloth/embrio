import * as td from 'testdouble'
import * as tc from 'testcontainers'
import { clean } from './cleaner'
import chai from 'chai'
import chaiHttp from 'chai-http'
import type { Server } from 'http'
import type * as EnvAdapterType from '@adapter/env'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as DBMigrate from 'db-migrate'

type DbConfig = typeof EnvAdapterType.env.db
if (String(process.env.EXT_SERVICE) === 'true') {
  const env = {} as typeof EnvAdapterType.env
  td.replace('@adapter/env', { env })

  let container: tc.StartedTestContainer
  before(async function () {
    this.timeout(60 * 1000)

    const [kontainer, db] = await log(
      'starting pg container',
      startPgContainer(),
      'ready!'
    )

    container = kontainer
    Object.assign(env, { port: 0, db })
    await log('running migrations', runMigrations(db), 'done!')

    if (String(process.env.APP_SERVICE) === 'true') {
      chai.use(chaiHttp)
      this.server = await log(
        'starting application',
        startApplication(),
        'ready!'
      )
    }
  })

  beforeEach(async function () {
    const { pool } = await import('@protocol/pg')
    await clean(pool())
  })

  after(async function () {
    this.timeout(20 * 1000)
    await log(
      'stopping pg container & application',
      Promise.all([container?.stop(), stopApplication(this.server)]),
      'done!'
    )
  })
}

async function startPgContainer(): Promise<
  [tc.StartedTestContainer, DbConfig]
> {
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

  return [container, db]
}

async function runMigrations(db: DbConfig) {
  const option = { driver: 'pg', ...db }
  const dbm = DBMigrate.getInstance(true, {
    env: 'test',
    config: { test: option }
  })
  dbm.silence(true)
  await dbm.registerAPIHook()
  await dbm.up()
}

async function startApplication() {
  const app = (await import('../../../src/app')).app
  return app.listen()
}

async function stopApplication(server: Server | undefined) {
  return new Promise(resolve => server?.close(resolve))
}

async function log<T>(start: string, f: Promise<T>, end: string) {
  const startTime = process.hrtime()
  process.stdout.write(`  ${start} ... `)
  const t = await f
  const hrtime = process.hrtime(startTime)
  const secs = (hrtime[0] + hrtime[1] / 1e9).toFixed(2)
  process.stdout.write(`${end} ${secs} secs elapsed \n`)
  return t
}
