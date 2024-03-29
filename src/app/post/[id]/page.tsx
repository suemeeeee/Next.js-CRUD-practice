import { getPostApi } from '@/services/posts'
import axios from 'axios'

const PostPage = async ({ params }: { params: { id: string } }) => {
  // const id = params.id
  // // any 수정하기
  // const post: any = await getPostApi(id)

  const post = await axios
    .get(`https://localhost:3000/api/posts/${params.id}`)
    .then((res) => {
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
    .catch((err) =>
      console.log('서버에 문제가 발생했습니다. 에러 메세지:', err.message),
    )

  return (
    <div className="w-3/4 flex flex-col items-center">
      <h1 className="text-4xl">{post.subject}</h1>
      <p className="mt-8 text-xl">{post.content}</p>
      <p>{post.nickname}</p>
    </div>
  )
}
export default PostPage
