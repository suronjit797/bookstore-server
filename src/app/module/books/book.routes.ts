import express from 'express'
import globalValidator from '../../middleware/globalValidation'
import bookController from './book.controllers'
import { createBookValidatorZod } from './book.validator'
import { tokenVerify } from '../../middleware/auth'

const bookRoute = express.Router()

bookRoute.post('/', globalValidator(createBookValidatorZod), tokenVerify, bookController.createCowController)
bookRoute.get('/', tokenVerify, bookController.getAllBooksController)

// params
bookRoute.get('/:bookId', tokenVerify, bookController.getSingleBookController)
bookRoute.patch('/:bookId', tokenVerify, bookController.updateBookController)

export default bookRoute
