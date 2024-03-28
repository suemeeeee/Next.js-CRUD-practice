import { NextRequest } from 'next/server'
import dbConnection from '@/services/mysql'

export async function GET(
  request: NextRequest,
  { params }: { params: { page: string } },
) {
  // page나 currentPage 등으로 수정
  const currentPage = Number(params.page)

  const limit = 4
  const offset = currentPage * Number(limit)

  const db = await dbConnection()
  const sql =
    'select * from posts where del = 0 order by ps_id desc limit ? offset ?'
  const [result, _] = await db.execute(sql, [`${limit}`, `${offset}`]) // 0~3 개까지
  await db.end()

  return Response.json(result)
}
