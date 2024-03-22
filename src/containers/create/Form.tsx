import Button from '@/components/Button'
import Input from '@/components/Input'
import { createUserDataApi } from '@/services/user'

const Form = () => {
  return (
    <div className="w-full flex justify-center items-center">
      <form
        action={createUserDataApi}
        className="w-full flex flex-col justify-center items-center"
      >
        <div className="w-3/4 ">
          <Input id="name" name="name" type="string" />
        </div>
        <div className="w-3/4 mt-4">
          <Input id="job" name="job" type="string" />
        </div>
        <div className="w-3/4 mt-4">
          <Input id="age" name="age" type="number" />
        </div>
        <div className="w-2/4 mt-16">
          <Button text="Submit" variant="form" />
        </div>
      </form>
    </div>
  )
}
export default Form
