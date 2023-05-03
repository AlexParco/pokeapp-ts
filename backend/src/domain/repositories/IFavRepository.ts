import type { Repository } from './Repository'
import type { Fav } from '../models/Fav'

export interface IFavRepository extends Repository<Fav> {
  findByUserId: (params: Pick<Fav, 'id_user'>) => Promise<Fav[]>
}
