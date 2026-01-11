import mongoose, { HydratedDocument, Model  } from 'mongoose';


import { IUserDocument } from '../database/models/user/userModel';

export class GenericRepository<T extends {_id?:string},D extends IUserDocument> {
protected _model:Model<D>

constructor (model:Model<D>){
    this._model=model
}
 async findOne(filter:Partial<T>):Promise<T|null>{
    const document=await this._model.findOne(filter)
    if(!document)return null
    else return this.mapToEntity(document)
}
protected mapToEntity(doc:HydratedDocument<D>):T{
   
   return doc.toObject() as T
}
}