'use client'

import Button from '@/components/Button'
import LinkButton from '@/components/LinkButton'
import { deletePostApi } from '@/services/posts'
import { getPost } from '@/services/postsApi'
import { PostType } from '@/types/postType'

const PostPage = async ({ params }: { params: { id: string } }) => {
  const post: PostType = await getPost(params.id)
  // const deleteUserDataWithId: () => Promise<void> = deletePostApi.bind(
  //   null,
  //   Number(params.id),
  // )

  console.log(post)

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="w-full flex flex-col items-center">
        <h1 className="text-4xl">{post.subject}</h1>
        <p className="mt-8 text-xl">{post.content}</p>
        <p className="mt-8">작성자: {post.nickname}</p>
      </div>
      <div className="w-3/4 flex mt-8">
        <form
          action={`/api/posts/${post.ps_id}`}
          method="delete"
          className="w-full flex"
        >
          <Button text="Delete" variant="usercard" id={params.id} />
        </form>
        <div className="w-full ml-4">
          <LinkButton
            href={`/post/edit/${params.id}`}
            text="Edit"
            variant="usercard"
          ></LinkButton>
        </div>
      </div>
    </div>
  )
}
export default PostPage
