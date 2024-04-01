import EditForm from '@/containers/edit/EditForm'
import { PostType } from '@/types/postType'
import { getPost } from '@/services/postsApi'

const Edit = async ({ params }: { params: { id: string } }) => {
  const post: PostType[] = await getPost(params.id)

  return (
    <div className="w-3/4 h-full">
      <EditForm post={post[0]} />
    </div>
  )
}
export default Edit
