const express = require("express")
const dotenv = require("dotenv")
dotenv.config()
const port = process.env.PORT
const app = express()
app.use(express.json())

app.listen(port, () => {
    console.log(`Orders service is running on port ${port}`);
})