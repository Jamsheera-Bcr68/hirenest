export interface IBaseRepository<T> {
  findById(id: string): Promise<T | null>;
  findOne(filter: Partial<T>): Promise<T | null>;
  save(data: T): Promise<T | null>;
}
