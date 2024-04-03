'use server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function revalidate(route: string) {
  revalidatePath(route)
  redirect(route)
}
