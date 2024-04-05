import Button from '@/components/Button'
import Input from '@/components/Input'
import TextArea from '@/components/TextArea'

const Form = () => {
  return (
    <div className="w-full flex justify-center items-center">
      <form
        action={'/api/posts'}
        method="post"
        className="w-full flex flex-col justify-center items-center"
      >
        <div className="w-3/4 ">
          <Input id="nickname" name="nickname" type="text" />
        </div>
        <div className="w-3/4 mt-4">
          <Input id="subject" name="subject" type="text" />
        </div>
        <div className="w-3/4 mt-4">
          <TextArea id="content" name="content" />
        </div>
        <div className="w-2/4 mt-16">
          <Button text="Submit" variant="form" />
        </div>
      </form>
    </div>
  )
}
export default Form
