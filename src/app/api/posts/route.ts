import dbConnection from '@/services/mysql'
import { NextRequest, NextResponse } from 'next/server'

// Type import
import { Connection, RowDataPacket } from 'mysql2/promise'
import { ReturnDataType } from '@/types/dbTypes'

export async function GET(request: NextRequest) {
  const limit = 5
  // null 처리
  const queryString: string | null = request.nextUrl.searchParams.get('page')
  const returnData: { data: ReturnDataType } = {
    data: {
      posts: [],
      count: 0,
      pageSize: limit,
      currentPage: 0,
      totalPage: 0,
    },
  }

  // 전체 게시글 조회
  try {
    const db: Connection = await dbConnection()
    const sql = `select * from posts where del = 0 order by ps_id desc;`
    const resultAll = await db.execute<RowDataPacket[]>(sql)

    if (Array.isArray(resultAll)) {
      // 전체 게시글 갯수
      returnData.data.count = resultAll.length
      // 전체 페이지 갯수 (전체 게시글 / limit을 올림한 값)
      returnData.data.totalPage = Math.ceil(resultAll.length / limit)
      // 현재 페이지 번호 (queryString 값. 없으면 Number(null) = 0)
      returnData.data.currentPage = Number(queryString ? queryString : 1)
    }

    // 쿼리스트링 있으면 pagination 처리
    if (queryString !== null) {
      const offset = (Number(queryString) - 1) * Number(limit)
      const sql =
        'select * from posts where del = 0 order by ps_id desc limit ? offset ?'
      const [result] = await db.execute<RowDataPacket[]>(sql, [
        `${limit}`,
        `${offset}`,
      ])

      returnData.data.posts = result
      await db.end()
    } else {
      const sql =
        'select * from posts where del = 0 order by ps_id desc limit ?'
      const [result] = await db.execute<RowDataPacket[]>(sql, [`${limit}`])
      returnData.data.posts = result
      await db.end()
    }
    return NextResponse.json(returnData)
  } catch (error) {
    return NextResponse.json(
      {
        error: error,
      },
      { status: 500 },
    )
  }
}

export async function POST(request: NextRequest, response: NextResponse) {
  const formData: FormData = await request.formData()
  const nickname: FormDataEntryValue | null = formData.get('nickname')
  const subject: FormDataEntryValue | null = formData.get('subject')
  const content: FormDataEntryValue | null = formData.get('content')

  // 데이터 유효성 검증
  // 클라이언트 측에서 받아온 formData의 value들이 null이거나 빈 문자열일 경우
  if (nickname === null || nickname === '') {
    return NextResponse.json(
      { error: '닉네임을 입력해주세요.' },
      { status: 400 },
    )
  }
  if (subject === null || subject === '') {
    return NextResponse.json({ error: '제목을 입력해주세요.' }, { status: 400 })
  }
  if (content === null || content === '') {
    return NextResponse.json({ error: '내용을 입력해주세요.' }, { status: 400 })
  }

  try {
    const db: Connection = await dbConnection()
    const sql = `insert into posts (nickname, subject, content, del) values (?, ?, ?, 0)`
    const [result] = await db.execute<RowDataPacket[]>(sql, [
      nickname,
      subject,
      content,
    ])
    await db.end()
    return NextResponse.json(result)
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        {
          error: error,
        },
        { status: 500 },
      )
    }
  }
}
