import axios from 'axios'

export default async function getPosts(query?: string) {
  const querystring = `?page=${query}`
  const data = await axios
    .get(`https://localhost:3000/api/posts/${query ? querystring : ''}`)
    .then((res) => {
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
