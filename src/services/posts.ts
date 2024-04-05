import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import dbConnection from './mysql'
import { Connection } from 'mysql2/promise'

// 전체 게시글 GET
export async function getPostsApi() {
  const db = await dbConnection()
  const sql = `select * from posts where del = 0 order by ps_id desc;`
  const [result, _] = await db.execute(sql)
  await db.end()

  return result
}

// 특정 게시글 GET
export async function getPostApi(id: string) {
  const db = await dbConnection()
  const sql = `select * from posts where ps_id = ? and del = 0`
  const [result] = await db.execute(sql, [id])
  await db.end()

  return result
}

// 새로운 user data POST
export async function createPostApi(formData: FormData) {
  'use server'
  const db = await dbConnection()

  const nickname = formData.get('nickname')
  const subject = formData.get('subject')
  const content = formData.get('content')

  const sql = `insert into posts (nickname, subject, content, del) values (?, ?, ?, 0)`
  const [result] = await db.execute(sql, [nickname, subject, content])
  await db.end()

  revalidatePath('/main')
  redirect('/main')
}

// 특정 유저 정보 수정 API
export async function updatePostApi(formData: FormData) {
  'use server'

  const db = await dbConnection()

  const ps_id = formData.get('ps_id')

  const nickname = formData.get('nickname')
  const subject = formData.get('subject')
  const content = formData.get('content')

  const sql = `update posts set nickname = ?, subject = ?, content = ?, updated_at = now()  where ps_id = ? and del = 0;`
  const [result] = await db.execute(sql, [nickname, subject, content, ps_id])
  await db.end()

  revalidatePath('/main')
  redirect('/main')
}

// 특정 user 삭제 API
export async function deletePostApi(id: number) {
  'use server'
  const db: Connection = await dbConnection()

  const sql = `update posts set del = 1 where ps_id = ? and del = 0;`
  const [result] = await db.execute(sql, [id])
  await db.end()

  revalidatePath('/main')
  redirect('/main')
}

// 페이지네이션 처리 api
export async function getPaginatedPostsApi(limit: string, offset: string) {
  'use server'
  const db = await dbConnection()

  const sql = `select * from posts limit ? offset ?;`
  const [result] = await db.execute(sql, [limit, offset]) // 0~3 개까지
  await db.end()

  return result
}
