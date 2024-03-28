import { NextRequest } from 'next/server'
import dbConnection from '@/services/mysql'

export async function GET(request: NextRequest) {
  // page나 currentPage 등으로 수정

  const limit = String(4)

  const db = await dbConnection()
  const sql = 'select * from posts where del = 0 order by ps_id desc limit ?'
  const [result, _] = await db.execute(sql, [limit]) // 0~3 개까지
  await db.end()

  return Response.json(result)
}
