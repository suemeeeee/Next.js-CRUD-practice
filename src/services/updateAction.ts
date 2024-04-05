import axios, { AxiosError, AxiosResponse } from 'axios'
import { revalidate } from '../utils/revalidate'

export async function updatePost(
  formData: FormData,
  ps_id: number,
): Promise<string | null> {
  let errMessage: string | null = null

  await axios
    .post(`https://localhost:3000/api/posts/${ps_id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((res: AxiosResponse) => {
      if (res.status === 200) {
        // 응답 코드 200일 경우 해당 게시글 상세화면으로 이동
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
      // 에러 타입 가드
      if (err instanceof AxiosError) {
        if (err.response?.status === 400) {
          // 400에러(유저가 하나라도 데이터를 null이나 공백으로 보냈을 경우)
          // 토스트 팝업 위한 에러 메세지 값 설정
          console.log('데이터가 불충분합니다.')
          errMessage = err.response.data.error
        } else {
          console.log('서버 에러가 발생했습니다. 에러코드:', err.message)
          errMessage = `서버 에러가 발생했습니다. 에러코드: ${err.message}`
        }
      }
    })

  // 에러 메세지 있으면 메세지, 없으면 null 리턴
  return errMessage
}
