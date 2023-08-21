import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { ApiError } from '../apiError';
import { config } from '../config';
import { passwordRegexp } from '../constants';
import { ICredentials, IJWTPayload } from '../types';

export class AuthMiddleware {
  public static async isAuthorized(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const token = req.headers.authorization;
    if (!token) {
      return next(new ApiError('Token is required', 401));
    }
    try {
      const { _id } = jwt.verify(token, config.JWT_SECRET) as IJWTPayload;
      if (!_id) {
        return next(new ApiError('Invalid token', 401));
      }
      res.locals.userId = _id;
      next();
    } catch (e) {
      return next(new ApiError(e.message, 400));
    }
  }

  public static isDataValid(
    req: Request,
    res: Response,
    next: NextFunction,
  ): void {
    const { username, password } = req.body as ICredentials;
    if (!username || !password) {
      return next(new ApiError('Invalid data', 400));
    }
    const isPasswordValid = passwordRegexp.test(password);
    if (!isPasswordValid) {
      return next(
        new ApiError(`Password does not match pattern ${passwordRegexp}`, 400),
      );
    }
    next();
  }
}
