import  {  Model, Types,HydratedDocument } from "mongoose";



export abstract class GenericRepository<
  T extends { id?: string },
  D extends {_id:Types.ObjectId}
> {
  protected _model: Model<D>;

  constructor(model: Model<D>) {
    this._model = model;
  }
  async findOne(filter: Partial<D>): Promise<T | null> {
     console.log('from generic repository filter',filter);
    const document = await this._model.findOne(filter);
    console.log('from generic repository documnt',document);
    
    if (!document) return null;
    else return this.mapToEntity(document);
  }
   protected abstract mapToEntity(doc: D): T;
}
