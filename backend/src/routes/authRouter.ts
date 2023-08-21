import { Router } from 'express'

import { AuthController } from '../controllers'
import { AuthMiddleware, CommonMiddleware } from '../middlewares'
import { User } from '../models'

const router = Router()

router.post(
    '/login',
    CommonMiddleware.isRecordExists('username', User),
    AuthController.login
)
router.post(
    '/register',
    AuthMiddleware.isDataValid,
    CommonMiddleware.isRecordNotExists('username', User),
    AuthController.register
)

export const authRouter = router
