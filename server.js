import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { sequelize } from "./db.js"
import { router } from "./routers/index.js"
import fileUpload from "express-fileupload"
import { errorHandler } from "./middleware/ErrorHandlingMiddleware.js"
dotenv.config()



const port = process.env.PORT
const app = express()
app.use(cors())

app.use(express.json())
app.use(express.static("static"))
app.use(fileUpload({}))
app.use("/api", router)
app.use(errorHandler)


async function startServer() {
    try{
        sequelize.authenticate()
        sequelize.sync()
        app.listen(port)
    }
    catch(e){
        console.dir(e)
    }
}
startServer().catch(console.dir)
