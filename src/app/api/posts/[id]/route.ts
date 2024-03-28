import dbConnection from '@/services/mysql'
import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

// 특정 게시글 GET
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const ps_id = params.id
  const db = await dbConnection()
  const sql = `select * from posts where ps_id = ? and del = 0`
  const [result, _] = await db.execute(sql, [ps_id])
  await db.end()

  return NextResponse.json(result)
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const db = await dbConnection()

  const sql = `update posts set del = 1 where ps_id = ? and del = 0;`
  const [result] = await db.execute(sql, [params.id])
  await db.end()

  revalidatePath('/main')
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const db = await dbConnection()
  const formdata = await request.formData()

  const ps_id = formdata.get('id')

  const nickname = formdata.get('nickname')
  const subject = formdata.get('subject')
  const content = formdata.get('content')

  const sql = `update posts set nickname = ?, subject = ?, content = ?, updated_at = now()  where ps_id = ? and del = 0;`
  const [result] = await db.execute(sql, [nickname, subject, content, ps_id])
  await db.end()

  revalidatePath('/main')
  redirect('/main')
}
