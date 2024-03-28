import { PostType } from '@/types/postType'
import Button from '@/components/Button'
import { deletePostApi } from '@/services/posts'
import Link from 'next/link'
import LinkButton from '@/components/LinkButton'

const PostCard = ({ post }: { post: PostType }) => {
  const deleteUserDataWithId = deletePostApi.bind(null, post.ps_id)

  return (
    <div className="w-full px-4 py-8 rounded-md bg-slate-100 hover:bg-slate-200">
      <div className="w-full flex justify-around">
        <div className="w-3/4 flex flex-col ">
          <Link href={`/post/${post.ps_id}`}>
            <h1 className="text-3xl">{post.subject}</h1>
          </Link>
          <div>
            <section className="text-lg mt-4 truncate">{post.content}</section>
          </div>
        </div>
        <div className="grow flex justify-center items-center">
          <form action={deleteUserDataWithId} className="w-full flex ">
            <Button text="Delete" variant="usercard" />
          </form>
          <div className="w-full ml-4">
            <LinkButton
              href={`/post/edit/${post.ps_id}`}
              text="Edit"
              variant="usercard"
            ></LinkButton>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostCard
