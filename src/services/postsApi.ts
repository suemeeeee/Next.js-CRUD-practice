import { PostType, getPostsType } from '@/types/postType'
import axios, { AxiosError, AxiosResponse } from 'axios'

export async function getPosts(query?: string): Promise<getPostsType> {
  const querystring: string = `?page=${query}`
  const data: getPostsType = await axios
    .get(`https://localhost:3000/api/posts/${query ? querystring : ''}`)
    .then((res: AxiosResponse) => {
      if (res.status === 200) {
        console.log('페이지 리스트 데이터를 성공적으로 가져왔습니다.')
        return res.data
      } else {
        console.log(
          '페이지 리스트 데이터를 가져오는데 문제가 발생했습니다. 상태코드:',
          res.statusText,
        )
      }
    })
    .catch((err) =>
      console.log('서버에 문제가 발생했습니다. 에러 메세지:', err.message),
    )

  return data
}

export async function getPost(params: string) {
  let data: PostType[] = await axios
    .get(`https://localhost:3000/api/posts/${params}`)
    .then((res: AxiosResponse) => {
      if (res.status === 200) {
        console.log('페이지 데이터를 성공적으로 가져왔습니다.')
        return res.data
      } else {
        console.log(
          '페이지 데이터를 가져오는데 문제가 발생했습니다. 상태코드:',
          res.statusText,
        )
      }
    })
    .catch((err: AxiosError) =>
      console.log('서버에 문제가 발생했습니다. 에러 메세지:', err.message),
    )

  return data
}

// export async function editPost(params: string) {
//   const data = await axios
//     .get(`https://localhost:3000/api/posts/${params}`)
//     .then((res: AxiosResponse) => {
//       if (res.status === 200) {
//         return res.data
//       } else {
//         console.log('데이터를 가져오는 데 실패했습니다. 상태코드:', res.status)
//       }
//     })
//     .catch((err: AxiosError) => {
//       console.log('서버 통신에 에러가 발생했습니다. Err:', err)
//     })

//   return data
// }