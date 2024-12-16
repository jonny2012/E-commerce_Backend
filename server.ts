import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { router } from "./src/routers/index.ts";
import fileUpload from "express-fileupload";
import { errorHandler } from "./src/middleware/ErrorHandlingMiddleware.ts";
import { db } from "./src/db/index.ts";
import { users } from "./drizzle/schema.ts";
import { userTable } from "./src/db/schema.ts";
dotenv.config();

const port = process.env.PORT;
const app = express();
app.use(cors());

app.use(express.json());
app.use(express.static("static"));
app.use(fileUpload({}));
app.use("/api", router);
app.use(errorHandler);

(async () => {
  try {
    // Test connection
    await db.execute(`SELECT 1`);

    console.log("Operation completed successfully!");
  } catch (err) {
    console.error("Error:hgvfc", err);
  }
})();

async function startServer() {
  try {
    app.listen(port);
  } catch (e) {
    console.error(e);
  }
}
startServer().catch(console.dir);
