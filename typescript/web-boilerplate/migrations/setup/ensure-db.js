const database = require('../../database.json')
const { Client } = require('pg')

const config = database[process.env.NODE_ENV || 'development']
delete config.driver

async function ensureDbExists() {
  const client = new Client({ ...config, database: 'postgres' })
  await client.connect()
  const result = await client
    .query(`CREATE DATABASE "${config.database}"`)
    .then(() => `[INFO] Database ${config.database} created`)
    .catch(() => '[INFO] Database already exists')

  console.log(result)
  client.end()
}

ensureDbExists()
