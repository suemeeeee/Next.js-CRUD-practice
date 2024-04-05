import axios, { AxiosError, AxiosResponse } from 'axios'
import { revalidate } from '../utils/revalidate'

export async function createPost(formData: FormData): Promise<string | null> {
  // 에러 시 반환할 에러 메세지
  let errMessage: string | null = null

  // axios로 post요청 수행
  await axios
    .post('https://localhost:3000/api/posts', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((res: AxiosResponse) => {
      if (res.status === 200) {
        // 성공 시 /main으로 이동
        console.log('게시글 생성 성공')
        revalidate('/main')
      } else {
        console.log(
          '게시글을 생성하는데 문제가 발생했습니다. 상태코드:',
          res.statusText,
        )
      }
    })
    .catch((err) => {
      // err 타입 가드
      if (err instanceof AxiosError) {
        if (err.response?.status === 400) {
          // 400에러(유저가 하나라도 데이터를 null이나 공백으로 보냈을 경우)
          // 토스트 팝업 위한 에러 메세지 값 설정
          console.log('데이터가 불충분합니다.')
          errMessage = err.response.data.error
        } else {
          console.log('서버 에러가 발생했습니다. 에러코드:', err.message)
          errMessage = err.message
        }
      }
    })

  // 에러 메세지 리턴. 성공 시 초기값 null이 반환 됨
  return errMessage
}
