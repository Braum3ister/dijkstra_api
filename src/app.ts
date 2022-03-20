import express from "express"
import "dotenv/config"
import logger from "./utils/logger"
import cors from "cors"
import apiRouter from "./routes/api-router"

const app = express();

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use("/api", apiRouter)

const PORT = process.env.PORT

app.listen(PORT, () => {
    logger.info(`Server listening on Port: ${PORT}`)
    logger.info(`DevSever on: ${process.env.LOCAL_HOST}${process.env.PORT}`)
})