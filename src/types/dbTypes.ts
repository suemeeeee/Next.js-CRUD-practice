import {
  FieldPacket,
  OkPacket,
  ProcedureCallPacket,
  ResultSetHeader,
  RowDataPacket,
} from 'mysql2/promise'
import { PostType } from './postType'

export type ResultType = [
  (
    | OkPacket
    | RowDataPacket[]
    | ResultSetHeader[]
    | RowDataPacket[][]
    | OkPacket[]
    | ProcedureCallPacket
  ),
  FieldPacket[],
]

export interface ReturnDataType {
  posts: RowDataPacket[] | PostType[]
  count: number
  pageSize: number
  currentPage: number
  totalPage: number
}
