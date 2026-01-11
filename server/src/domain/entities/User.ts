export class User{
public readonly _id?:string
  public email:string
   public password:string
  public  phone:string
   public createdAt:Date
   public updatedAt:Date

    constructor(
   email:string,
    password:string,
    phone:string,
    _id?:string,
    createdAt=new Date(),
    updatedAt=new Date()){
        this._id=_id
        this.email=email
        this.password=password
        this.phone=phone
        this.createdAt=createdAt
        this.updatedAt=updatedAt
    }
}
    
