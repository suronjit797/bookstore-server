import express from "express";
import globalValidator from "../../middleware/globalValidation";
import {userLoginValidatorZod, userRegisterValidatorZod} from "./users.validator";
import usersController from "./users.controllers";

const usersRoute = express.Router();

usersRoute.post(
  "/signup",
  globalValidator(userRegisterValidatorZod),
  usersController.signUpController
);
usersRoute.post(
  "/login",
  globalValidator(userLoginValidatorZod),
  usersController.signUpController
);

export default usersRoute;
