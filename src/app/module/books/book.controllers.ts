import { RequestHandler } from 'express'
import { IResponsePayload } from '../../../shared/globalInterfaces'

import { paginationHelper } from '../../../helper/paginationHelper'
import filterHelper from '../../../helper/filterHelper'
import bookService from './book.service'
import { IBook } from './book.interface'
import UserModel from '../users/users.Model'
import ApiError from '../../../shared/ApiError'
import httpStatus from 'http-status'
import BookModel from './book.Model'

const createCowController: RequestHandler = async (req, res, next) => {
  try {
    const isUserExist = UserModel.isExist(req.user.email)
    if (!isUserExist) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'User not found')
    }
    const newBook = { ...req.body, author: req.user._id }

    console.log(newBook)

    const data = await bookService.createBookService(newBook)
    const payload: IResponsePayload<IBook> = {
      statusCode: data.statusCode,
      success: data.success,
      message: data.message,
      data: data.data,
    }
    // send response
    return res.status(payload.statusCode).send(payload)
  } catch (error) {
    return next(error)
  }
}

const getAllBooksController: RequestHandler = async (req, res, next) => {
  try {
    const pagination = paginationHelper(req.query)
    const filter = filterHelper(req, new BookModel(), ['title', 'genre', 'author.name'])
    const data = await bookService.getAllBooksService(filter, pagination)

    const payload: IResponsePayload<IBook[]> = {
      statusCode: data.statusCode,
      success: data.success,
      message: data.message,
      meta: data.meta,
      data: data.data,
    }
    // send response
    return res.status(payload.statusCode).send(payload)
  } catch (error) {
    return next(error)
  }
}

const getSingleBookController: RequestHandler = async (req, res, next) => {
  try {
    const { bookId } = req.params
    const data = await bookService.getBookService(bookId)

    const payload: IResponsePayload<IBook> = {
      statusCode: data.statusCode,
      success: data.success,
      message: data.message,
      data: data.data,
    }
    // send response
    return res.status(payload.statusCode).send(payload)
  } catch (error) {
    return next(error)
  }
}

const updateBookController: RequestHandler = async (req, res, next) => {
  try {
    const { bookId } = req.params
    const data = await bookService.updateBookService(bookId, req.body)

    const payload: IResponsePayload<IBook> = {
      statusCode: data.statusCode,
      success: data.success,
      message: data.message,
      data: data.data,
    }
    // send response
    return res.status(payload.statusCode).send(payload)
  } catch (error) {
    return next(error)
  }
}

const removeBookController: RequestHandler = async (req, res, next) => {
  try {
    const { bookId } = req.params
    const data = await bookService.removeBookService(bookId)

    const payload: IResponsePayload<IBook> = {
      statusCode: data.statusCode,
      success: data.success,
      message: data.message,
      data: data.data,
    }
    // send response
    return res.status(payload.statusCode).send(payload)
  } catch (error) {
    return next(error)
  }
}

const bookController = {
  createCowController,
  getAllBooksController,
  getSingleBookController,
  updateBookController,
  removeBookController,
}

export default bookController
