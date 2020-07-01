import type { pool } from '@protocol/pg'

type Pool = ReturnType<typeof pool>

const skipTables = ['migrations']

export async function clean(pol: Pool) {
  const query = await pol.query(
    `SELECT TABLE_NAME FROM information_schema.tables
     WHERE table_schema = 'public'
     AND table_type = 'BASE TABLE';`
  )

  const tables = query.rows
    .map(t => t.table_name)
    .filter(t => !skipTables.includes(t))

  return Promise.all(tables.map(t => cleanTable(pol, t)))
}

async function cleanTable(pol: Pool, tableName: string) {
  return pol.query(`DELETE FROM ${tableName}`)
}
