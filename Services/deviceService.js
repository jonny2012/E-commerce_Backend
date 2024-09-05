import { Device } from "../models/models.js";



class deviceService{

    async createDevice(name,price,brandId, typeId, filename){
        const device =  await Device.create({name, price,brandId,typeId,img:filename})
        return device
    }
   

}
export default new deviceService()