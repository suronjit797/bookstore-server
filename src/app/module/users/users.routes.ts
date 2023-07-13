import express from "express";
import globalValidator from "../../middleware/globalValidation";
import userValidatorZod from "./users.validator";
import usersController from "./users.controllers";

const usersRoute = express.Router();

usersRoute.post(
  "/signup",
  globalValidator(userValidatorZod),
  usersController.signUpController
);

export default usersRoute;
