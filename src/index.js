const express = require("express")
const app = express()
const mongoose = require("mongoose")
require("dotenv").config()

app.get("/", (req, res) => res.send(`<ul><li>Hi App Node</li></ul>`))

const mongodb_connection_url = process.env.URL_MONGO
mongoose
  .connect(mongodb_connection_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
  .then(() => {
    console.log("MONGO DB OK")
    app.listen(process.env.PORT, () => {
      console.log(`starter-app listening on port ${process.env.PORT}!`)
    })
  })
  .catch((error) => console.log("ERROR MONGO:", error))
