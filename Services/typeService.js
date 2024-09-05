import { Type } from "../models/models.js"

class typeService{

    async  create(name){

        const newType = await Type.create({name})
        return newType
    }

    async  getTypes(){

        const types = await Type.findAll()
        return types
    }

    async  deleteType(id){

        const rowsDeleted = await Type.destroy({where: {id}})
        return rowsDeleted
    }
}
export default  new typeService()