import {Request, Response, NextFunction} from "express"
import {INote} from "../types"
import {NoteServices} from "../services";
import {ApiError} from "../apiError";

export class NoteController {
    public static async createNote(req: Request, res: Response, next: NextFunction) {
        try {
            const userId: string = res.locals.userId;
            const {title, body} = await NoteServices.createNote(req.body as INote, userId);
            return res.json({title, body});
        } catch (e) {
            next(e)
        }
    }

    public static async getByAccessKey(req: Request, res: Response, next: NextFunction): Promise<Response<INote>> {
        try {
            const {key: accessKey} = req.params
            const {title, body} = res.locals.note;
            return res.json({title, body});
        } catch (e) {
            next(e)
        }
    }
}