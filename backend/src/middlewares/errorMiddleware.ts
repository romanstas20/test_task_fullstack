import { NextFunction, Request, Response } from 'express'

import { ApiError } from '../apiError'

export const errorMiddleware = (
    error: ApiError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const status = error.status || 500
    return res.status(status).json({ message: error.message })
}
