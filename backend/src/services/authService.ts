import { compare, genSalt, hash } from 'bcrypt'
import jwt from 'jsonwebtoken'

import { ApiError } from '../apiError'
import { config } from '../config'
import { User } from '../models'
import { ICredentials, IUser } from '../types'

export class AuthService {
    public static async login(
        credentials: ICredentials,
        user: IUser
    ): Promise<string> {
        const isPasswordMatch: boolean = await compare(
            credentials.password,
            user.password
        )
        if (!isPasswordMatch) {
            throw new ApiError('Invalid credentials', 400)
        }
        return jwt.sign({ _id: user._id }, config.JWT_SECRET, {
            expiresIn: '7d',
        })
    }

    public static async register(
        credentials: ICredentials
    ): Promise<Partial<IUser>> {
        const { username, password } = credentials
        const salt = await genSalt(config.SALT_COUNT)
        const hashedPassword: string = await hash(password, salt)
        const { _id, username: createdUserName } = (await User.create({
            username,
            password: hashedPassword,
        })) as IUser
        return { _id, username: createdUserName }
    }
}
