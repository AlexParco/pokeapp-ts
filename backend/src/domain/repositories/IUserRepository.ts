import type { User } from '../models/User'
import type { Repository } from './Repository'

export interface IUserRepository extends Repository<User> {
  findAll: () => Promise<User[]>
  findByEmail: (params: Pick<User, 'email'>) => Promise<User>
  findById: (params: Pick<User, 'id'>) => Promise<User>
}
