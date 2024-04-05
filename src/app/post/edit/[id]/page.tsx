import EditForm from '@/containers/edit/EditForm'
import { PostType } from '@/types/postType'
import { getPost } from '@/services/postsApi'

const Edit = async ({ params }: { params: { id: string } }) => {
  const post: PostType = await getPost(params.id)

  return (
    <div className="w-full">
      <EditForm post={post} />{' '}
    </div>
  )
}
export default Edit
