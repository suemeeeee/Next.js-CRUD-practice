import Button from '@/components/Button'
import Input from '@/components/Input'
import TextArea from '@/components/TextArea'
import { PostType } from '@/types/postType'

const EditForm = ({ post }: { post: PostType }) => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <form
        action={`/api/posts/${post.ps_id}`}
        method="post"
        className="w-full h-full flex flex-col justify-center items-center"
      >
        <div className="w-3/4">
          <Input
            id="nickname"
            name="nickname"
            type="text"
            defaultValue={post.nickname}
          ></Input>
        </div>
        <div className="w-3/4 mt-4">
          <Input
            id="subject"
            name="subject"
            type="text"
            defaultValue={post.subject}
          ></Input>
        </div>
        <div className="w-3/4 mt-4">
          <TextArea id="content" name="content" value={post.content} />
          <input
            type="hidden"
            id="ps_id"
            name="ps_id"
            value={post.ps_id}
          ></input>
        </div>
        <div className="w-2/4 mt-16">
          <Button text="Update" variant="form" />
        </div>
      </form>
    </div>
  )
}
export default EditForm
