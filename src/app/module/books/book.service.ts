import ApiError from '../../../shared/ApiError'
import { IFilter, IPagination, IResponsePayload } from '../../../shared/globalInterfaces'

import httpStatus from 'http-status'
import { IBook } from './book.interface'
import BookModel from './book.Model'

const createBookService = async (payload: IBook): Promise<IResponsePayload<IBook>> => {
  const data = await BookModel.create(payload)

  return {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Book created successfully',
    data,
  }
}

const getAllBooksService = async (filter: IFilter, pagination: IPagination): Promise<IResponsePayload<IBook[]>> => {
  const { limit, page, skip, sortCondition } = pagination
  const data = await BookModel.find(filter).limit(limit).skip(skip).sort(sortCondition)
  const total = await BookModel.countDocuments(filter)

  return {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book retrieved successfully',
    data,
    meta: {
      page,
      limit,
      total,
    },
  }
}

const getBookService = async (id: string): Promise<IResponsePayload<IBook>> => {
  const data = await BookModel.findById(id).populate({ path: 'seller' })

  return {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book retrieved successfully',
    data,
  }
}

const updateBookService = async (id: string, body: Partial<IBook>): Promise<IResponsePayload<IBook>> => {
  const data = await BookModel.findByIdAndUpdate(id, body, { new: true })

  return {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book updated successfully',
    data,
  }
}

const removeBookService = async (id: string): Promise<IResponsePayload<IBook>> => {
  const data = await BookModel.findByIdAndDelete(id)

  return {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book deleted successfully',
    data,
  }
}

const bookService = {
  createBookService,
  getAllBooksService,
  getBookService,
  updateBookService,
  removeBookService,
}

export default bookService
