import axios, { AxiosError, AxiosResponse } from 'axios'
import { revalidate } from '../utils/revalidate'

export async function updatePost(formData: FormData, ps_id: number) {
  let errMessage: string = ''
  await axios
    .post(`https://localhost:3000/api/posts/${ps_id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((res) => {
      if (res.status === 200) {
        console.log('게시글 수정 성공')
        revalidate(`https://localhost:3000/post/${ps_id}`)
      } else {
        console.log(
          '게시글을 수정하는데 문제가 발생했습니다. 상태코드:',
          res.statusText,
        )
      }
    })
    .catch((err) => {
      if (err.response.status === 400) {
        console.log('데이터가 불충분합니다.')
        errMessage = err.response.data.error
      }
    })

  return errMessage ? errMessage : null
}
