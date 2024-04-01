import {
  FieldPacket,
  OkPacket,
  ProcedureCallPacket,
  ResultSetHeader,
  RowDataPacket,
} from 'mysql2/promise'

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
  data: {
    posts: {}
    count: number
    pageSize: number
    currentPage: number
    totalPage: number
  }
}
