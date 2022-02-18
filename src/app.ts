import express from "express"
import "dotenv/config"
import logger from "./utils/logger"

const app = express();
const apiRoute = require("./routes/Api")


app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use("/api", apiRoute)

const PORT = process.env.PORT

app.listen(PORT, () => {
    logger.info(`Server listening on Port: ${PORT}`)
    logger.info(`DevSever on: ${process.env.LOCAL_HOST}${process.env.PORT}`)
})