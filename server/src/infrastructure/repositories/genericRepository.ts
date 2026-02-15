import { Model, Types, UpdateQuery } from 'mongoose';
import { IBaseRepository } from '../../domain/repositoriesInterfaces/IBaseRepository';

export abstract class GenericRepository<
  T extends { id?: string },
  D extends { _id: Types.ObjectId },
> implements IBaseRepository<T> {
  protected _model: Model<D>;

  constructor(model: Model<D>) {
    this._model = model;
  }
  async findOne(filter: Partial<T>): Promise<T | null> {
    //console.log("from generic repository filter", filter);
    const { id, ...rest } = filter;
    const query = { ...rest } as Partial<D>;
    if (id) {
      query._id = new Types.ObjectId(id);
    }

    const document = await this._model.findOne(query);
    //  console.log("from generic repository documnt", document);

    if (!document) return null;
    else return this.mapToEntity(document);
  }
  async save(id: string, data: Partial<T>): Promise<T | null> {
    console.log('entity from generic  repo ', data);
    const persisted = this.mapToPersistance(data);
    console.log('persisted ',persisted);
    
    const updated = await this._model.findByIdAndUpdate(
      id,
      persisted as UpdateQuery<D>,
      { new: true }
    )
    console.log('updated from user after savig repo', updated);

    if (!updated) return null;
    return this.mapToEntity(updated);
  }
  async findById(id: string): Promise<T | null> {
    console.log('from general reppo findby id');
    
    const user = await this._model.findById(id);
    if (!user) return null;
    return this.mapToEntity(user);
  }
  protected abstract mapToEntity(doc: D): T;
  protected abstract mapToPersistance(entity: Partial<T>): Partial<D>;
}
