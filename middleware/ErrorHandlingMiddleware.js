import ApiErrors from "../errors/ApiError.js";


export function errorHandler(err, req,res,next){
    if(err instanceof ApiErrors){
        return res.status(err.status).json({message: err.message})
    }
    return res.status(500).json({message: "Unexpected error"})

}