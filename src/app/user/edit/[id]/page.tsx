import EditForm from '@/containers/edit/EditForm'
import { getUserDataApi } from '@/services/user'

const Edit = async ({ params }: { params: { id: string } }) => {
  const id = params.id
  const userData = await getUserDataApi(id)

  return (
    <div className="w-3/4">
      <EditForm userData={userData} />
    </div>
  )
}
export default Edit
