import dbConnection from '@/services/mysql'
import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

// Type import
import { Connection } from 'mysql2/promise'
import { ReturnDataType, ResultType } from '@/types/dbTypes'

export async function GET(request: NextRequest) {
  const limit: number = 2
  const queryString = request.nextUrl.searchParams.get('page')
  const returnData: { data: ReturnDataType } = {
    data: {
      posts: {},
      count: 0,
      pageSize: limit,
      currentPage: 0,
      totalPage: 0,
    },
  }

  // 전체 게시글 조회
  try {
    const db: Connection = await dbConnection()
    const sql: string = `select * from posts where del = 0 order by ps_id desc;`
    const [resultAll]: ResultType = await db.execute(sql)

    if (Array.isArray(resultAll)) {
      // 전체 게시글 갯수
      returnData.data.count = resultAll.length
      // 전체 페이지 갯수 (전체 게시글 / limit을 올림한 값)
      returnData.data.totalPage = Math.ceil(resultAll.length / limit)
      // 현재 페이지 번호 (queryString 값. 없으면 Number(null) = 0)
      returnData.data.currentPage = Number(queryString)
    }

    // 쿼리스트링 있으면 pagination 처리
    if (queryString !== null) {
      const offset: number = (Number(queryString) - 1) * Number(limit)
      const sql: string =
        'select * from posts where del = 0 order by ps_id desc limit ? offset ?'
      const [result] = await db.execute(sql, [`${limit}`, `${offset}`])
      returnData.data.posts = result
      await db.end()
    } else {
      // 없으면 0페이지로 제일 앞 페이지
      const sql: string =
        'select * from posts where del = 0 order by ps_id desc limit ?'
      const [result]: ResultType = await db.execute(sql, [`${limit}`])
      returnData.data.posts = result
      await db.end()
    }

    return Response.json(returnData)
  } catch (error) {
    return NextResponse.json(
      {
        error: error,
      },
      { status: 500 },
    )
  }
}

export async function POST(request: NextRequest) {
  const formData: FormData = await request.formData()

  const nickname: FormDataEntryValue | null = formData.get('nickname')
  const subject: FormDataEntryValue | null = formData.get('subject')
  const content: FormDataEntryValue | null = formData.get('content')

  try {
    const db: Connection = await dbConnection()
    const sql: string = `insert into posts (nickname, subject, content, del) values (?, ?, ?, 0)`
    const [result]: ResultType = await db.execute(sql, [
      nickname,
      subject,
      content,
    ])

    await db.end()
  } catch (error) {
    return NextResponse.json(
      {
        error: error,
      },
      { status: 500 },
    )
  }
  revalidatePath('/main')
  redirect('/main')
}
