import dbConnection from '@/services/mysql'
import { NextRequest, NextResponse } from 'next/server'

// Type import
import { Connection, FieldPacket, RowDataPacket } from 'mysql2/promise'
import { PageInfoType, PostType } from '@/types/postType'

export async function GET(request: NextRequest) {
  // 페이지당 받아올 게시글 수
  const limit = 4
  // 쿼리스트링. null일 경우, 제일 첫 페이지이다.
  const queryString: string | null = request.nextUrl.searchParams.get('page')
  // 반환할 데이터
  const returnData: { data: PageInfoType } = {
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
    const [resultAll, field]: [PostType[], FieldPacket[]] =
      await db.execute(sql)

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
      // 몇 번째 게시글부터 limit만큼 가져올 건지. (페이지 - 1) * 가져올 개수
      const offset = (Number(queryString) - 1) * Number(limit)
      const sql =
        'select * from posts where del = 0 order by ps_id desc limit ? offset ?'
      const [result, field]: [PostType[], FieldPacket[]] = await db.execute(
        sql,
        [`${limit}`, `${offset}`],
      )

      returnData.data.posts = result
      await db.end()
    } else {
      // 쿼리스트링 없으면, 즉 페이지 정보 없으면 0페이지. 가장 초기 페이지 데이터를 가져온다.
      const sql =
        'select * from posts where del = 0 order by ps_id desc limit ?'
      const [result, field]: [PostType[], FieldPacket[]] = await db.execute(
        sql,
        [`${limit}`],
      )
      returnData.data.posts = result
      await db.end()
    }
    return NextResponse.json(returnData)
  } catch (error) {
    // 타입 가드 처리
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

export async function POST(request: NextRequest) {
  // 매개변수로 받은 request에서 formData를 추출해 formData변수에 담아준다.
  const formData: FormData = await request.formData()

  // formData 변수에 get메서드를 사용하여 작성자, 제목, 내용 변수에 각각 담아준다.
  const nickname: FormDataEntryValue | null = formData.get('nickname')
  const subject: FormDataEntryValue | null = formData.get('subject')
  const content: FormDataEntryValue | null = formData.get('content')

  // 타입 검사 string이 아니면 에러 반환
  if (typeof nickname !== 'string') {
    return NextResponse.json(
      { error: 'typeError. typeof nickname is not string' },
      { status: 400 },
    )
  }
  if (typeof subject !== 'string') {
    return NextResponse.json(
      { error: 'typeError. typeof nickname is not string' },
      { status: 400 },
    )
  }
  if (typeof content !== 'string') {
    return NextResponse.json(
      { error: 'typeError. typeof nickname is not string' },
      { status: 400 },
    )
  }

  if (nickname === null || nickname === '') {
    // 데이터 유효성 검증
    // 클라이언트 측에서 받아온 formData의 value들이 null이거나 빈 문자열일 경우 에러응답
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
    const [result, field]: [PostType[], FieldPacket[]] = await db.execute(sql, [
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
