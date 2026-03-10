const express = require("express")
const connectDB = require("./config/connectDB")
const app = express()
require("dotenv").config()

const PORT = process.env.PORT 
app.use(express.json())

connectDB()

app.listen(PORT , () => {
    console.log(`server is running on port ${PORT}`)
})