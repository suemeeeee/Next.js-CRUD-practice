import axios, { AxiosError, AxiosResponse } from 'axios'
import { revalidate } from '../utils/revalidate'
import { CustomError } from '@/types/dbTypes'

export async function createPost(formData: FormData) {
  let errMessage: string = ''

  await axios
    .post('https://localhost:3000/api/posts', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((res: AxiosResponse) => {
      if (res.status === 200) {
        console.log('게시글 생성 성공')
        revalidate('/main')
      } else {
        console.log(
          '게시글을 생성하는데 문제가 발생했습니다. 상태코드:',
          res.statusText,
        )
      }
    })
    .catch((err: AxiosError) => {
      if (err instanceof CustomError) {
        if (err.response?.status === 400) {
          console.log('데이터가 불충분합니다.')
          errMessage = err.response?.data?.error.message
        }
      }
    })

  return errMessage ? errMessage : null
}
