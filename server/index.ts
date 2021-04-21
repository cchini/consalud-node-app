import * as express from "express";
import * as mongoose from "mongoose";
import * as cors from "cors";
import * as bodyParser from "body-parser";
import { generateRouters } from "./routers/v1";
import * as httpStatus from "http-status";
require("dotenv").config();

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  cors({
    credentials: true,
    origin: true,
  })
);
generateRouters(app);

app.use(
  (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): void => {
    const response = {
      statusCode: httpStatus.NOT_FOUND,
      message: "NOT_FOUND",
      data: null,
    };
    res.status(httpStatus.NOT_FOUND).json(response);
    next();
  }
);

mongoose
  .connect(process.env.URL_MONGO || "", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(async () => {
    console.log(`🚀 Mongo OK! 🚀`);
    app.listen(process.env.PORT, () => {
      console.log(`🚀 Node App: Listening on port ${process.env.PORT}! 🚀`);
    });
  })
  .catch((error) => {
    console.log(`\n🤬 ERROR MONGO 🤬`);
    console.log(`\n ${error}`);
  });
