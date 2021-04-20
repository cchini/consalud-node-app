import * as express from "express";
import * as mongoose from "mongoose";
require("dotenv").config();

const app = express();

app.get("/", (req, res) => res.send(`<ul><li>Hi App Node</li></ul>`));

mongoose
  .connect(process.env.URL_MONGO || "", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log(`🚀 Mongo OK! 🚀`);
    app.listen(process.env.PORT, () => {
      console.log(`🚀 Node App: Listening on port ${process.env.PORT}! 🚀`);
    });
  })
  .catch((error) => {
    console.log(`\n🤬 ERROR MONGO 🤬`);
    console.log(`\n ${error}`);
  });
