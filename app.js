const express = require("express")
const connectDB = require("./config/connectDB")
const createRegister = require("./controllers/registerController")
const errorHandler = require("./middlewares/errorHandler")
const app = express()
require("dotenv").config()

const PORT = process.env.PORT 
app.use(express.json())

connectDB()

app.post("/register" , createRegister)

app.use(errorHandler)

app.listen(PORT , () => {
    console.log(`server is running on port ${PORT}`)
})