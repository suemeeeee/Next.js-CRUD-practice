import dbConnection from '@/services/mysql'
import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { Connection, FieldPacket } from 'mysql2/promise'
import { PostType } from '@/types/postType'

// 특정 게시글 GET
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const ps_id: string = params.id

  try {
    const db: Connection = await dbConnection()
    // 상수 & 정해진 문자열. 즉 굳이 타입을 선언할 필요 없다. TS가 알아서 string으로 타입 추론을 진행한다.
    const sql = `select * from posts where ps_id = ? and del = 0`
    const [result, field]: [PostType[], FieldPacket[]] = await db.execute(sql, [
      ps_id,
    ])
    await db.end()
    return NextResponse.json(result[0])
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

// 특정 게시글 삭제
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const ps_id: string = params.id

  try {
    const db: Connection = await dbConnection()

    const sql = `update posts set del = 1 where ps_id = ? and del = 0;`
    const [result, field]: [PostType[], FieldPacket[]] = await db.execute(sql, [
      ps_id,
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

// 특정 게시글 업데이트
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const ps_id: string = params.id

  const formdata: FormData = await request.formData()
  const nickname: FormDataEntryValue | null = formdata.get('nickname')
  const subject: FormDataEntryValue | null = formdata.get('subject')
  const content: FormDataEntryValue | null = formdata.get('content')

  // 데이터 유효성 검증
  // 클라이언트 측에서 받아온 formData의 value들이 null이거나 빈 문자열일 경우
  if (nickname === null || nickname === '') {
    return NextResponse.json(
      { error: '닉네임을 입력해주세요!' },
      { status: 400 },
    )
  }
  if (subject === null || subject === '') {
    return NextResponse.json({ error: '제목을 입력해주세요!' }, { status: 400 })
  }
  if (content === null || content === '') {
    return NextResponse.json({ error: '내용을 입력해주세요!' }, { status: 400 })
  }

  try {
    const db: Connection = await dbConnection()

    const sql = `update posts set nickname = ?, subject = ?, content = ?, updated_at = now()  where ps_id = ? and del = 0;`
    const [result, field]: [PostType[], FieldPacket[]] = await db.execute(sql, [
      nickname,
      subject,
      content,
      ps_id,
    ])
    await db.end()
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

  revalidatePath(`/post/${ps_id}`)
  redirect(`/post/${ps_id}`)
}
