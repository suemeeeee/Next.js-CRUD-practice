import Button from '@/components/Button'
import Input from '@/components/Input'
import { User } from '@/types/userType'

const EditForm = ({ userData }: { userData: User }) => {
  // 특정 유저 정보 수정 API
  async function updateUserDataApi(formData: FormData) {
    'use server'

    const newEditedUserData = {
      name: formData.get('name'),
      email: formData.get('email'),
    }

    await fetch(`https://reqres.in/api/users/${userData.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newEditedUserData),
    })
      .then((res) => console.log('Update Success. Status Code is', res.status))
      .catch((err) => console.log(err))
  }

  return (
    <div className="w-full flex justify-center items-center">
      <form
        action={updateUserDataApi}
        className="w-full flex flex-col justify-center items-center"
      >
        <div className="w-3/4 ">
          <Input
            id="name"
            name="name"
            type="string"
            placeholder={`${userData.first_name} ${userData.last_name}`}
          ></Input>
        </div>
        <div className="w-3/4 mt-4">
          <Input
            id="email"
            name="email"
            type="string"
            placeholder={userData.email}
          />
        </div>
        <div className="w-2/4 mt-16">
          <Button text="Update" variant="form" />
        </div>
      </form>
    </div>
  )
}
export default EditForm
