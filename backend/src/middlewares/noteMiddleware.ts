import {NextFunction, Request, Response} from "express";

import {NoteServices} from "../services";
import {ApiError} from "../apiError";
import {Note} from "../models";
import {INote} from "../types";

export class NoteMiddleware {
    public static async isKeyValid(req: Request, res: Response, next: NextFunction) {
        try {
            const {key: accessKey} = req.params;
            const {userId} = res.locals;
            res.locals.note = await NoteServices.getByAccessKey(userId, accessKey);
            next();
        } catch (e) {
            next(e)
        }
    }

    public static async isNoteExists(req: Request, res: Response, next: NextFunction) {
        try {
            const {title, accessKey} = req.body as INote;
            const {userId} = res.locals
            const encryptedKey = NoteServices.encryptAccessKey(userId, accessKey);
            const note = await Note.findOne({
                $or: [
                    {accessKey: encryptedKey},
                    {title}
                ]
            });
            if (note) {
                return next(new ApiError("Note already exists", 400));
            }
            next()
        } catch (e) {
            next(e)
        }
    }
}