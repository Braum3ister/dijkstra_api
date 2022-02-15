import express from "express"
import "dotenv/config"


const app = express();
const route = require("./routes/api/dijkstra")


app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use("/dijkstra", route)

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`Server listening on Port: ${PORT}`)
    console.log(`DevSever on: ${process.env.LOCAL_HOST}${process.env.PORT}`)
})