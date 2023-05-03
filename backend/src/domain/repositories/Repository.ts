export interface Repository<T = any> {
  findAll: () => Promise<T[]>
  update: (params: T) => Promise<T>
  save: (params: T) => Promise<T>
  delete: (params: T) => Promise<T>
}
