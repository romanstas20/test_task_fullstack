import { NextFunction, Request, Response } from 'express'

import { NoteServices } from '../services'
import { INote } from '../types'

export class NoteController {
    public static async createNote(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const userId: string = res.locals.userId
            const { title, body } = await NoteServices.createNote(
                req.body as INote,
                userId
            )
            return res.json({ title, body })
        } catch (e) {
            next(e)
        }
    }

    public static async getByAccessKey(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response<INote>> {
        try {
            const { title, body } = res.locals.note
            return res.json({ title, body })
        } catch (e) {
            next(e)
        }
    }
}
