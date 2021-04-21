import * as mongoose from "mongoose";
import { Request, Response, NextFunction } from "express";
import * as httpStatus from "http-status";
import UserModel, { UserDoc } from "../../models/user.model";
import PlanModel from "../../models/plan.model";

interface ResponseError extends Error {
  status?: number;
  statusCode?: number;
}

export const errorHandler = (
  error: mongoose.NativeError | null,
  next: NextFunction,
  item: any
): void => {
  if (error) return next(error);
  if (!item) {
    const error: ResponseError = new Error("ERROR_500");
    error.status = httpStatus.INTERNAL_SERVER_ERROR;
    return next(error);
  }
};

export const saveUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const dataUser = {
    rut: req.body?.rut,
    plan: req.body?.plan,
  };

  if (dataUser.rut && dataUser.plan) {
    const planDoc = await PlanModel.findOne({ code: dataUser.plan }).exec();
    if (!planDoc) {
      const response = {
        data: "No existe plan",
        statusCode: httpStatus.BAD_REQUEST,
      };
      res.status(httpStatus.BAD_REQUEST).json(response);
    } else {
      let data: UserDoc | any;
      const dataSet = {
        rut: dataUser.rut,
        plan: planDoc,
      };
      const userDoc = await UserModel.findOne({ rut: dataUser.rut }).exec();
      if (userDoc) {
        data = {
          ...userDoc,
          ...dataSet,
        };
      } else {
        data = dataSet;
      }

      const saveData = await new UserModel(data).save();

      const response = {
        data: saveData,
        statusCode: httpStatus.OK,
      };
      res.status(httpStatus.OK).json(response);
    }
  } else {
    const response = {
      data: null,
      statusCode: httpStatus.BAD_REQUEST,
    };
    res.status(httpStatus.BAD_REQUEST).json(response);
  }
};
