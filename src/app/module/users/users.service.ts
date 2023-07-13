import { IResponsePayload } from '../../../shared/globalInterfaces'
import userModel from './userModel'
import { IUser } from './users.interface'
import httpStatus from 'http-status'

const signUpService = async (payload: IUser): Promise<IResponsePayload<IUser>> => {
  const data = await userModel.create(payload)

  return {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'User created successfully',
    data,
  }
}

const usersService = {
  signUpService,
}

export default usersService
