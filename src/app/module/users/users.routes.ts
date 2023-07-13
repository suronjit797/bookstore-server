import express from 'express'
import { userLoginValidatorZod, userRegisterValidatorZod } from './users.validator'
import usersController from './users.controllers'
import globalValidator from '../../middleware/globalValidation'

const usersRoute = express.Router()

usersRoute.post('/signup', globalValidator(userRegisterValidatorZod), usersController.signUpController)
usersRoute.post('/login', globalValidator(userLoginValidatorZod), usersController.loginController)

export default usersRoute
