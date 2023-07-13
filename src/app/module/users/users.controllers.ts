import { RequestHandler } from "express";
import { IResponsePayload } from '../../../shared/globalInterfaces'
import usersService from "./users.service";
import { IUser } from './users.interface'

const signUpController: RequestHandler = async (req, res, next) => {
  try {
    const data = await usersService.signUpService(req.body);
    const payload: IResponsePayload<IUser> = {
      statusCode: data.statusCode,
      success: data.success,
      message: data.message,
      data: data.data,
    };
    // send response
    return res.status(payload.statusCode).send(payload);
  } catch (error) {
    return next(error);
  }
};

const usersController = {
  signUpController,
};

export default usersController;
