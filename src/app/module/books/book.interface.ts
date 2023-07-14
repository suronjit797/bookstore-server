import { Types } from 'mongoose'
import { Model } from 'mongoose'

export type IBook = {
  title: string
  author: Types.ObjectId
  genre: string
  publicationDate: Date
  reviews: IReview[]
}

export type IReview = {
  user: string
  comment: string
}

export type IBookModel = Model<IBook, Record<string, unknown>>
