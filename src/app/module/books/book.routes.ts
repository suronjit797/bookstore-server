import express from 'express'
import globalValidator from '../../middleware/globalValidation'
import bookController from './book.controllers'
import { createBookValidatorZod } from './book.validator'
import { tokenVerify } from '../../middleware/auth'

const bookRoute = express.Router()

bookRoute.post('/', globalValidator(createBookValidatorZod), tokenVerify, bookController.createCowController)
// bookRoute.post('/', globalValidator(userLoginValidatorZod), bookController)

export default bookRoute
