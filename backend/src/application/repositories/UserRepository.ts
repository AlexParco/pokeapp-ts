/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { type User } from '../../domain/models/User'
import { type IUserRepository } from '../../domain/repositories/IUserRepository'
import { type SqlClient } from '../../infrastructure/db/pg'
import type { QueryResult, QueryConfig } from 'pg'

export class UserRepository implements IUserRepository {
  private readonly SqlAdapter: SqlClient

  constructor (db: SqlClient) {
    this.SqlAdapter = db
  }

  findAll = async (): Promise<User[]> => {
    return await new Promise((resolve, reject) => {
      this.SqlAdapter.db.query<User[]>('SELECT * FROM users WHERE email=$1', (err, result) => {
        err
          ? reject(err)
          : resolve(result.rows[0])
      })
    })
  }

  findById = async (params: Pick<User, 'id'>): Promise<User> => {
    const query: QueryConfig = {
      text: 'SELECT * FROM users WHERE id = $1',
      values: [params.id]
    }
    return await new Promise((resolve, reject) => {
      this.SqlAdapter.db.query<User>(query, (err: Error, result: QueryResult<User>) => {
        err
          ? reject(err)
          : resolve(result.rows[0])
      })
    })
  }

  findByEmail = async (params: Pick<User, 'email'>): Promise<User> => {
    const query: QueryConfig = {
      text: 'SELECT * FROM users WHERE email=$1',
      values: [params.email]
    }
    return await new Promise((resolve, reject) => {
      this.SqlAdapter.db.query<User>(query, (err, result) => {
        err
          ? reject(err)
          : resolve(result.rows[0])
      })
    })
  }

  update = async (params: User): Promise<User> => {
    throw Error()
  }

  save = async (params: User): Promise<User> => {
    const query: QueryConfig = {
      text: 'INSERT INTO users (id, username, email, password, role) VALUES ($1, $2, $3, $4, $5) RETURNING * ',
      values: [params.id, params.username, params.email, params.password, params.role]
    }
    return await new Promise((resolve, reject) => {
      this.SqlAdapter.db.query<User>(query, (err, result) => {
        err
          ? reject(err)
          : resolve(result.rows[0])
      })
    })
  }

  delete = async (params: User): Promise<User> => {
    const query: QueryConfig = {
      text: 'DELETE FROM users WHERE id=$1 RETURNING *',
      values: [params.id]
    }
    return await new Promise((resolve, reject) => {
      this.SqlAdapter.db.query<User>(query, (err, result) => {
        err
          ? reject(err)
          : resolve(result.rows[0])
      })
    })
  }
}
