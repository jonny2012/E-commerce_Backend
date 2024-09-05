import ApiError from "../errors/ApiError.js"
import brandService from "../Services/brandService.js"


class brandController {


    async getBrands(req,res,next){
      try{
  const brands = await brandService.getAllBrands()
  res.json(brands)
    }
    catch(e){
      next(ApiError.badRequest(e.message))
    }
  
    }

    async createBrand(req,res){
        const {name} = req.body

        try{
          const  type = await brandService.createBrand(name)
          res.json(type)
        }  
        catch(err){
                console.log(err)
        }
    }

}
export default new brandController()