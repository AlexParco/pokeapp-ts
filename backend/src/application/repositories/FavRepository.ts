/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import type { QueryResult, QueryConfig } from 'pg'
import { type Fav } from '../../domain/models/Fav'
import { type IFavRepository } from '../../domain/repositories/IFavRepository'
import { type SqlClient } from '../../infrastructure/db/pg'

export class FavRepository implements IFavRepository {
  private readonly SqlAdapter: SqlClient

  constructor (db: SqlClient) {
    this.SqlAdapter = db
  }

  findByUserId = async (params: Pick<Fav, 'id_user'>): Promise<Fav[]> => {
    const query: QueryConfig = {
      text: 'SELECT * FROM pokefavs WHERE user_id = $1',
      values: [params.id_user]
    }
    return await new Promise((resolve, reject) => {
      this.SqlAdapter.db.query<Fav[]>(query, (err: Error, result: QueryResult<Fav[]>) => {
        err
          ? reject(err)
          : resolve(result.rows[0])
      })
    })
  }

  findAll = async (): Promise<Fav[]> => {
    return await new Promise((resolve, reject) => {
      this.SqlAdapter.db.query<Fav[]>('SELECT * FROM pokefavs', (err: Error, result: QueryResult<Fav[]>) => {
        err
          ? reject(err)
          : resolve(result.rows[0])
      })
    })
  }

  save = async (params: Fav): Promise<Fav> => {
    const query: QueryConfig = {
      text: 'INSERT INTO pokefavs (id, user_id, pokemon_id) VALUES ($1, $2, $3) RETURNING * ',
      values: [params.id, params.id_user, params.id_pokemon]
    }
    return await new Promise((resolve, reject) => {
      this.SqlAdapter.db.query<Fav>(query, (err, result) => {
        err
          ? reject(err)
          : resolve(result.rows[0])
      })
    })
  }

  delete = async (params: Fav): Promise<Fav> => {
    const query: QueryConfig = {
      text: 'DELETE FROM pokefavs WHERE user_id=$1 and pokemon_id=$2 RETURNING *',
      values: [params.id_user, params.id_pokemon]
    }
    return await new Promise((resolve, reject) => {
      this.SqlAdapter.db.query<Fav>(query, (err, result) => {
        err
          ? reject(err)
          : resolve(result.rows[0])
      })
    })
  }

  update = async (params: Fav): Promise<Fav> => {
    throw Error('method not implemented')
  }
}
