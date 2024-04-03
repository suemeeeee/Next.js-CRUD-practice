'use client'
import Button from '@/components/Button'
import Input from '@/components/Input'
import TextArea from '@/components/TextArea'
import { FormEvent, useState } from 'react'
import ToastPopup from '@/components/ToastPopup'
import { revalidate } from '@/utils/revalidate'
import axios, { AxiosResponse } from 'axios'
import { createPost } from '@/services/createAction'

const Form = () => {
  const [errroMessage, setErrroMessage] = useState<string>('')
  const [toast, setToast] = useState<boolean>(false)

  const onSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    const formData: FormData = new FormData(event.currentTarget)

    const response = await createPost(formData)
    if (response) {
      setErrroMessage(response)
      setToast(true)
    }
  }
  return (
    <div className="w-full flex justify-center items-center">
      <form
        onSubmit={onSubmit}
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
      {toast && (
        <ToastPopup message={errroMessage} setToast={setToast}></ToastPopup>
      )}
    </div>
  )
}
export default Form
