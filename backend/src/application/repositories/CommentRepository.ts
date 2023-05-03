/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import type { QueryConfig, QueryResult } from 'pg'
import { type Comment } from '../../domain/models/Comment'
import { type ICommentRepository } from '../../domain/repositories/ICommentRepository'
import { type SqlClient } from '../../infrastructure/db/pg'

export class CommentRepository implements ICommentRepository {
  private readonly SqlAdapter: SqlClient

  constructor (db: SqlClient) {
    this.SqlAdapter = db
  }

  findByPokemonId = async (params: Pick<Comment, 'id_pokemon'>): Promise<Comment[]> => {
    const query: QueryConfig = {
      text: 'SELECT * FROM comments WHERE pokemon_id = $1 ORDER BY created_at',
      values: [params.id_pokemon]
    }
    return await new Promise((resolve, reject) => {
      this.SqlAdapter.db.query<Comment[]>(query, (err: Error, result: QueryResult<Comment[]>) => {
        err
          ? reject(err)
          : resolve(result.rows[0])
      })
    })
  }

  findAll = async (): Promise<Comment[]> => {
    return await new Promise((resolve, reject) => {
      this.SqlAdapter.db.query<Comment[]>('SELECT * FROM comments', (err: Error, result: QueryResult<Comment[]>) => {
        err
          ? reject(err)
          : resolve(result.rows[0])
      })
    })
  }

  save = async (params: Comment): Promise<Comment> => {
    const query: QueryConfig = {
      text: 'INSERT INTO comments (id, user_id, pokemon_id) VALUES ($1, $2, $3) RETURNING * ',
      values: [params.id, params.id_user, params.id_pokemon]
    }
    return await new Promise((resolve, reject) => {
      this.SqlAdapter.db.query<Comment>(query, (err, result) => {
        err
          ? reject(err)
          : resolve(result.rows[0])
      })
    })
  }

  delete = async (params: Comment): Promise<Comment> => {
    const query: QueryConfig = {
      text: 'DELETE FROM comments WHERE id=$1 RETURNING *',
      values: [params.id]
    }
    return await new Promise((resolve, reject) => {
      this.SqlAdapter.db.query<Comment>(query, (err, result) => {
        err
          ? reject(err)
          : resolve(result.rows[0])
      })
    })
  }

  update = async (params: Comment): Promise<Comment> => {
    throw Error('method not implemented')
  }
}
