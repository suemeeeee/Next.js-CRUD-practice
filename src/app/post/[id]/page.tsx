import { getPostApi } from '@/services/posts'

const PostPage = async ({ params }: { params: { id: string } }) => {
  // const id = params.id
  // // any 수정하기
  // const post: any = await getPostApi(id)

  const post = await fetch(`https://localhost:3000/api/posts/${params.id}`)
    .then((res) => {
      if (!res.ok) {
        throw new Error('에러 발생')
      }
      return res.json()
    })
    .then((json) => {
      return json[0]
    })
    .catch((err) => console.log('err: ', err))

  return (
    <div className="w-3/4 flex flex-col items-center">
      <h1 className="text-4xl">{post.subject}</h1>
      <p className="mt-8 text-xl">{post.content}</p>
      <p>{post.nickname}</p>
    </div>
  )
}
export default PostPage