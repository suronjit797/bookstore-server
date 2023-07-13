import { Schema, model } from 'mongoose'
import { IUser, IUserModel } from './users.interface'

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      require: true,
      trim: true,
    },
  },

  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
)

const userModel = model<IUser, IUserModel>('User', userSchema)

export default userModel
