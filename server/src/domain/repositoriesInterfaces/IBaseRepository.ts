export interface IBaseRepository<T> {
  findById(id: string): Promise<T | null>;
  findOne(filter: Partial<T>): Promise<T | null>;
  save(id:string,data:Partial<Omit<T,'id'>>): Promise<T | null>;
}
