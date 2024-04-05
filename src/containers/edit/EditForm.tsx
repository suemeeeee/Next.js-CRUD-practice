'use client'
import Button from '@/components/Button'
import Input from '@/components/Input'
import TextArea from '@/components/TextArea'
import ToastPopup from '@/components/ToastPopup'
import { updatePost } from '@/services/updateAction'
import { PostType } from '@/types/postType'
import { FormEvent, useState } from 'react'

const EditForm = ({ post }: { post: PostType }) => {
  // 참고: 주석 containsers/create/Form.tsx와 동일
  const [errroMessage, setErrroMessage] = useState<string>('')
  const [toast, setToast] = useState<boolean>(false)

  const onSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)

    const response: string | null = await updatePost(formData, post?.ps_id)
    if (response) {
      setErrroMessage(response)
      setToast(true)
    }
  }

  return (
    <div className="w-full h-full flex justify-center items-center">
      <form
        onSubmit={onSubmit}
        className="w-full h-full flex flex-col justify-center items-center"
      >
        <div className="w-3/4">
          <Input
            id="nickname"
            name="nickname"
            type="text"
            defaultValue={post?.nickname}
          ></Input>
        </div>
        <div className="w-3/4 mt-4">
          <Input
            id="subject"
            name="subject"
            type="text"
            defaultValue={post?.subject}
          ></Input>
        </div>
        <div className="w-3/4 mt-4">
          <TextArea id="content" name="content" value={post?.content} />
        </div>
        <div className="w-2/4 mt-16">
          <Button text="Update" variant="form" />
        </div>
      </form>
      {toast && (
        <ToastPopup message={errroMessage} setToast={setToast}></ToastPopup>
      )}
    </div>
  )
}
export default EditForm
