import { Pool } from 'pg'

export interface SqlClient {
  db: Pool
}

export class MySqlClient implements SqlClient {
  private readonly database: Pool

  constructor () {
    this.database = new Pool({
      host: '',
      user: '',
      password: '',
      database: '',
      port: 5432
    })
  }

  get db (): Pool {
    return this.database
  }
}
