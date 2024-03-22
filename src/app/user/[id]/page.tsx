import { getUserDataApi } from '@/services/user'

const UserPage = async ({ params }: { params: { id: string } }) => {
  const id = params.id
  const userData = await getUserDataApi(id)

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-4xl">
        Hello, I'm {userData.first_name} {userData.last_name}!
      </h1>
      <img
        src={userData.avatar}
        className="w-2/4 mt-8 rounded-full hover:scale-110 transition-transform ease-in-out duration-500"
      />
      <p className="mt-8 text-xl">E-mail : {userData.email}</p>
    </div>
  )
}
export default UserPage
