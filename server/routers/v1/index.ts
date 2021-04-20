import { Express } from "express";
import planRouter from "./plan.router";
import userRouter from "./user.router";

const apiV1 = "/api/v1";

export const generateRouters = (app: Express): void => {
  app.use(apiV1, planRouter);
  app.use(apiV1, userRouter);
};
