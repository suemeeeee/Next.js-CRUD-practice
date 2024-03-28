import dbConnection from '@/services/mysql'
import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

// Type import
import { Connection } from 'mysql2/promise'
import { ReturnDataType, ResultType } from '@/types/dbTypes'

export async function GET(request: NextRequest) {
  const queryString = request.nextUrl.searchParams.get('page')
  const returnData: { data: ReturnDataType } = {
    data: { posts: {}, count: 0, pageSize: 5, currentPage: 0, totalPage: 0 },
  }

  const db: Connection = await dbConnection()
  const sql: string = `select * from posts where del = 0 order by ps_id desc;`
  const [result]: ResultType = await db.execute(sql)
  await db.end()

  // 전체 아이템 개수
  if (Array.isArray(result)) {
    returnData.data.count = result.length
    // limit 변수로 바꾸기
    returnData.data.totalPage = Math.ceil(result.length / 5)
    returnData.data.currentPage = Number(queryString)
  }

  // 쿼리스트링 있으면 pagination 처리
  if (queryString) {
    const limit: number = 4
    const offset: number = Number(queryString) * Number(limit)
    const db: Connection = await dbConnection()
    const sql: string =
      'select * from posts where del = 0 order by ps_id desc limit ? offset ?'
    const [result] = await db.execute(sql, [`${limit}`, `${offset}`]) // 0~3 개까지
    await db.end()
    returnData.data.posts = result
  }

  return Response.json(returnData)
}

export async function POST(request: NextRequest) {
  const db: Connection = await dbConnection()

  const formData: FormData = await request.formData()

  const nickname: FormDataEntryValue | null = formData.get('nickname')
  const subject: FormDataEntryValue | null = formData.get('subject')
  const content: FormDataEntryValue | null = formData.get('content')

  const sql: string = `insert into posts (nickname, subject, content, del) values (?, ?, ?, 0)`
  const [result]: ResultType = await db.execute(sql, [
    nickname,
    subject,
    content,
  ])
  await db.end()

  revalidatePath('/main')
  redirect('/main')
}
