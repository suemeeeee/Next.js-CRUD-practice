import { RowDataPacket } from 'mysql2'
import { PostType } from './postType'

export interface ReturnDataType {
  posts: RowDataPacket[] | PostType[]
  count: number
  pageSize: number
  currentPage: number
  totalPage: number
}

export class CustomError extends Error {
  response?: {
    data: { error: { message: string; code: string } }
  }
}
