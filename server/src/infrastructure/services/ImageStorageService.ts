
import { UploadFileDto } from "../../applications/Dtos/uploadFileDto";
import { IImageStorageService } from "../../applications/interfaces/services/IImageStorage";
import fs from 'fs'
import path from "path";
import { randomUUID } from "crypto";

export class ImageStorageService implements IImageStorageService{
    constructor(){}
   async uploadImage(file: UploadFileDto, folder: string="uploads"): Promise<string> {
        const uploadDir=path.join(process.cwd(),"public",folder)
     
        await fs.promises.mkdir(uploadDir, { recursive: true });

        const fileExtension=file.originalName.split(".").pop()||"jpg"
        const fileName=`${randomUUID()}.${fileExtension}`
        const filePath=path.join(uploadDir,fileName)

        await fs.promises.writeFile(filePath,file.buffer)
        return `/${folder}/${ fileName}`
    }
}