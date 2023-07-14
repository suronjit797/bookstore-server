import { Schema, model } from 'mongoose'
import { IBook, IBookModel } from './book.interface'

const bookSchema = new Schema<IBook>(
  {
    title: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      require: true,
      trim: true,
    },
    publicationDate: {
      type: Date,
      required: true,
    },
    reviews: [
      {
        user: String,
        comment: String,
      },
    ],
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      require: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
)

const BookModel = model<IBook, IBookModel>('Book', bookSchema)

export default BookModel
