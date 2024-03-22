import { User } from '@/types/userType'
import Button from '@/components/Button'
import { deleteUserDataApi } from '@/services/user'
import Link from 'next/link'

const Usercard = ({ userData }: { userData: User }) => {
  const deleteUserDataWithId = deleteUserDataApi.bind(null, userData.id)
  return (
    // <Link href={`/user/${userData.id}`}>
    <div className="w-56 m-4 px-4 py-8 rounded-md bg-slate-100 hover:bg-slate-200">
      <div className="w-full flex flex-col justify-center">
        <div className="w-full flex justify-center">
          <img src={userData.avatar} className="rounded-full" />
        </div>
        <div className="w-full mt-4 flex flex-col justify-center">
          <p className="text-center">{userData.last_name}</p>
          <p className="text-center">{userData.email}</p>
        </div>
        <div className="mt-4 mx-2 flex flex-row justify-between items-center">
          <form action={deleteUserDataWithId} className="grow mr-1.5">
            <Button text="Delete" variant="usercard" />
          </form>
          <Link href={`/user/edit/${userData.id}`}>
            <Button text="Edit" variant="usercard" />
          </Link>
        </div>
      </div>
    </div>
    // </Link>
  )
}

export default Usercard
