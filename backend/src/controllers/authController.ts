import { NextFunction, Request, Response } from 'express'

import { AuthService } from '../services'
import { ICredentials, IUser } from '../types'

export class AuthController {
    public static async login(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response<string>> {
        try {
            const credentials: ICredentials = req.body
            const user: IUser = res.locals.record
            const token = await AuthService.login(credentials, user)
            return res.json({ token })
        } catch (e) {
            next(e)
        }
    }

    public static async register(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response<Partial<IUser>>> {
        try {
            const credentials: ICredentials = req.body
            const user = await AuthService.register(credentials)
            return res.json(user)
        } catch (e) {
            next(e)
        }
    }
}
