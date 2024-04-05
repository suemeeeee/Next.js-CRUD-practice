'use client'
import Button from '@/components/Button'
import Input from '@/components/Input'
import TextArea from '@/components/TextArea'
import { FormEvent, useState } from 'react'
import ToastPopup from '@/components/ToastPopup'
import { createPost } from '@/services/createAction'

const Form = () => {
  // 토스트 알림에 띄울 에러메세지. 서버에서 받아온 에러메세지이다.
  const [errroMessage, setErrroMessage] = useState<string>('')
  // 토스트 팝업 상태변수. true일 때 토스트 팝업이 보인다.
  const [toast, setToast] = useState<boolean>(false)

  // form submit시 실행될 함수로, form 태그의 onSubmit 함수로 넣어준다.
  const onSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    // form submit시 발생하는 기본동작으로 인한 새로고침 방지
    event.preventDefault()
    // 생성자 FormData()로 FormData 객체를 생성하고 매개변수로 HTML <form> 요소를 넣는다.
    // 그러면 FormData 객체가 form의 key/value로 채워진다. key/value는 submit한 각 요소의 name 속성과 value를 사용한다.
    // key/value로 채운 FormData 객체를 const formData 변수에 담는다.
    const formData: FormData = new FormData(event.currentTarget)

    // formData 변수를 매개변수로 가지는 게시글 생성 api함수, createPost 함수를 호출하여 결과값을 response에 담는다.
    const response: string | null = await createPost(formData)
    if (response) {
      // 만약 결과 값이 있다면 (error인 경우) 토스트 팝업에 보낼 메세지변수를 받은 에러메세지로 바꿔주고
      // toast 팝업이 보이도록 true로 바꿔준다.
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
