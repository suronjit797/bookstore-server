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

const createBookController: RequestHandler = async (req, res, next) => {
  try {
    const isUserExist = UserModel.isExist(req.user.email)
    if (!isUserExist) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'User not found')
    }
    const newBook = { ...req.body, author: req.user.name, authorDetails: req.user._id }

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
    const filter = filterHelper(
      req,
      new BookModel(),
      ['title', 'genre', 'author'],
      ['publicationDate']
    )
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

const getAllYear: RequestHandler = async (req, res, next) => {
  try {
    const pagination = paginationHelper(req.query)
    const data = await bookService.getYearService(pagination)

    const payload: IResponsePayload<string[]> = {
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

const bookController = {
  createBookController,
  getAllBooksController,
  getSingleBookController,
  updateBookController,
  removeBookController,
  getAllYear,
}

export default bookController
