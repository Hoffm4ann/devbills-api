import { NextFunction, Request, Response } from "express";
import { ZodRawShape, z } from "zod";
import { AppError } from "../errors/app.error";
import { StatusCodes } from "http-status-codes";

export enum ParansType {
  QUERY = "query",
  BODY = "body",
}
type ValidateParams = {
  schema: ZodRawShape;
  type: ParansType;
};

export function validator(params: ValidateParams) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = z.object(params.schema).safeParse(req[params.type]);
    if (!result.success) {
      const errorFormatted = result.error.issues.map(
        (item) => `${item.path.join(".")}: ${item.message}`,
      );
      throw new AppError(errorFormatted, StatusCodes.UNPROCESSABLE_ENTITY);
    }
    req[params.type] = result.data;
    next();
  };
}
