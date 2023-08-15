import {Types} from "mongoose";

export interface IUser {
    _id?: Types.ObjectId | string
    username: string;
    password: string;
}

export type ICredentials = Omit<IUser, "_id">