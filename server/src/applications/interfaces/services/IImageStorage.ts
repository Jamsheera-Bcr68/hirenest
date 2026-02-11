import { UploadFileDto } from "../../Dtos/uploadFileDto"

export interface IImageStorageService{
    uploadImage(file:UploadFileDto,folder?:string):Promise<string>
}