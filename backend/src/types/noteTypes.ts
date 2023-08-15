import { Types } from "mongoose"

export interface INote {
  _id?: Types.ObjectId | string,
  title: string,
  body: string
  accessKey: string
}