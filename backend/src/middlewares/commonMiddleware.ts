import { NextFunction, Request, Response } from 'express';
import { Model } from 'mongoose';

import { ApiError } from '../apiError';

export class CommonMiddleware {
  public static isRecordExists(
    fieldName: string,
    model: Model<any>,
    from: 'body' | 'query' | 'params' = 'body',
  ) {
    return async (
      req: Request,
      res: Response,
      next: NextFunction,
    ): Promise<void> => {
      const field = req[from][fieldName];
      const record = await model.findOne({ [fieldName]: field });
      if (!record) {
        return next(
          new ApiError(`Record with ${fieldName} ${field} does not exist`, 404),
        );
      }
      res.locals.record = record;
      next();
    };
  }

  public static isRecordNotExists(
    fieldName: string,
    model: Model<any>,
    from: 'body' | 'query' | 'params' = 'body',
  ) {
    return async (
      req: Request,
      res: Response,
      next: NextFunction,
    ): Promise<void> => {
      const field = req[from][fieldName];
      const record = await model.findOne({ [fieldName]: field });
      if (record) {
        return next(
          new ApiError(`Record with ${fieldName} ${field} already exists`, 400),
        );
      }
      next();
    };
  }
}
