import {Router} from 'express';

import {NoteController} from "../controllers"
import {AuthMiddleware, CommonMiddleware, NoteMiddleware} from "../middlewares";
import {Note} from "../models";

const router = Router();

router.post('/create',
    AuthMiddleware.isAuthorized,
    NoteMiddleware.isNoteExists,
    NoteController.createNote
);
router.get('/:key',
    AuthMiddleware.isAuthorized,
    NoteMiddleware.isKeyValid,
    NoteController.getByAccessKey
);

export const noteRouter = router;