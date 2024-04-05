import { revalidate } from '@/utils/revalidate'
import axios, { AxiosError, AxiosResponse } from 'axios'

export async function deletePost(params: string): Promise<void> {
  await axios
    .delete(`https://localhost:3000/api/posts/${params}`)
    .then((res: AxiosResponse) => {
      if (res.status === 200) {
        console.log('게시글 삭제에 성공했습니다.')
        revalidate('/main')
      } else {
        console.log(
          '페이지 데이터를 가져오는데 문제가 발생했습니다. 상태코드:',
          res.statusText,
        )
      }
    })
    .catch((err: AxiosError) =>
      console.error('서버에 문제가 발생했습니다. 에러 메세지:', err.message),
    )
}
