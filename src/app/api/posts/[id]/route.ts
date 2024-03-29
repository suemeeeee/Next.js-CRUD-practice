import dbConnection from '@/services/mysql'
import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { Connection } from 'mysql2/promise'
import { ResultType } from '@/types/dbTypes'

// 특정 게시글 GET
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const ps_id: string = params.id

  try {
    const db: Connection = await dbConnection()
    const sql: string = `select * from posts where ps_id = ? and del = 0`
    const [result]: ResultType = await db.execute(sql, [ps_id])
    await db.end()

    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json(
      {
        error: error,
      },
      { status: 500 },
    )
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

    const sql: string = `update posts set del = 1 where ps_id = ? and del = 0;`
    const [result]: ResultType = await db.execute(sql, [ps_id])
    await db.end()
    revalidatePath('/main')
  } catch (error) {
    return NextResponse.json(
      {
        error: error,
      },
      { status: 500 },
    )
  }
}

// 특정 게시글 업데이트
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const queryString = request.nextUrl.searchParams.get('page')
  const ps_id: string = params.id

  const formdata = await request.formData()
  const nickname = formdata.get('nickname')
  const subject = formdata.get('subject')
  const content = formdata.get('content')

  try {
    const db = await dbConnection()

    const sql = `update posts set nickname = ?, subject = ?, content = ?, updated_at = now()  where ps_id = ? and del = 0;`
    const [result] = await db.execute(sql, [nickname, subject, content, ps_id])
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
  redirect(`/main`)
}
