import type { Repository } from './Repository'
import type { Comment } from '../models/Comment'

export interface ICommentRepository extends Repository<Comment> {
  findByPokemonId: (params: Pick<Comment, 'id_pokemon'>) => Promise<Comment[]>
}
