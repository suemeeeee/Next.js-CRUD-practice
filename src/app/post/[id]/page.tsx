import { getPost } from '@/services/postsApi'
import { PostType } from '@/types/postType'
import axios, { AxiosError, AxiosResponse } from 'axios'

const PostPage = async ({ params }: { params: { id: string } }) => {
  const post: PostType[] = await getPost(params.id)

  return (
    <div className="w-3/4 flex flex-col items-center">
      <h1 className="text-4xl">{post[0].subject}</h1>
      <p className="mt-8 text-xl">{post[0].content}</p>
      <p>{post[0].nickname}</p>
    </div>
  )
}
export default PostPage
