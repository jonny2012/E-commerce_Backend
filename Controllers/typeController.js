import { Type } from "../models/models.js"
import typeService from "../Services/typeService.js"

class typeController {

    async getAll(req, res){

        try{

        }
        catch(err){
            throw new Error(err)
        }
          }

          
    async deleteType(req, res, next){
const id = req.params.id
if (!id) {
    return next(ApiError.badRequest("Type id not entered"))
}
const  type = await Type.findByPk(id)

        try{
            const deletedRows = await  typeService.deleteType(type.id)
            if(deletedRows > 0 ) res.json({message:`succesfull deleted type with id ${type.id} `})
                else res.json({message:"Wrong type id"})
            }

        catch(err){
            throw new Error(err)
        }
          }
    
    async createType(req, res){
        const {name} = req.body

        try{
          const  type = await typeService.create(name)
          res.json(type)
        }  
        catch(err){
                console.log(err)
        }
    }

}
export default new typeController()