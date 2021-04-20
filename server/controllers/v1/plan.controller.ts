import * as mongoose from "mongoose";
import { Request, Response, NextFunction } from "express";
import * as httpStatus from "http-status";
import * as RequestApi from "request";
import PlanModel, { PLanDoc } from "../../models/plan.model";

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

export const getAllPlans = (
  __: Request,
  res: Response,
  next: NextFunction
): void => {
  PlanModel.find().exec((error: mongoose.CallbackError, item: PLanDoc[]) => {
    // Error response
    if (error || !item) return errorHandler(error, next, item);
    // Ok response
    const response = {
      data: item,
      statusCode: httpStatus.OK,
    };
    res.status(httpStatus.OK).json(response);
  });
};

export const getFilterPlan = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (req.params?.salary) {
    const salary = parseInt(req.params.salary);
    const percent = (salary / 100) * 15;
    const salaryMax = salary + percent;
    const salaryMin = salary - percent;

    PlanModel.find({
      $and: [{ price: { $gte: salaryMin } }, { price: { $lte: salaryMax } }],
    }).exec((error: mongoose.CallbackError, item: PLanDoc[]) => {
      // Error response
      if (error || !item) return errorHandler(error, next, item);
      // Ok response
      const response = {
        data: item,
        statusCode: httpStatus.OK,
      };
      res.status(httpStatus.OK).json(response);
    });
  } else {
    const response = {
      data: null,
      statusCode: httpStatus.BAD_REQUEST,
    };
    res.status(httpStatus.BAD_REQUEST).json(response);
  }
};

export const importPlans = async () => {
  try {
    RequestApi.get(
      process.env.URL_GET_PLAN || "",
      async (error, response: RequestApi.Response, body: any) => {
        if (error) console.log(error);
        if (body) {
          const data = JSON.parse(body).map((item: any) => {
            const objectData = {
              _id: new mongoose.Types.ObjectId(),
              name: item.Nombre,
              price: item.precio,
              code: item.CodigoPlan,
            };
            return objectData;
          });
          await PlanModel.create(data);
          console.log(`🚀 Data imported OK! 🚀`);
        }
      }
    );
  } catch (err) {
    console.error(err);
  }
};
