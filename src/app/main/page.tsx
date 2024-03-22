import { getUsersDataApi } from '@/services/user'

import Usercard from '@/containers/main/Usercard'
import { User } from '@/types/userType'

const Main = async () => {
  const users = await getUsersDataApi()
  return (
    <div className="flex flex-wrap w-full justify-center">
      {users.map((user: User) => (
        <Usercard userData={user}></Usercard>
      ))}
    </div>
  )
}

export default Main
