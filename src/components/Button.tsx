'use client'

import axios from 'axios'
const Button = ({
  text,
  variant,
  id,
}: {
  text: string
  variant: string
  id?: number | string
}) => {
  interface VariantsType {
    [variant: string]: string
  }

  // tailwind 동적 스타일링
  const buttonVariants: VariantsType = {
    nav: 'w-full py-4 px-4 text-cyan-800 rounded-full bg-slate-200 transition hover:bg-slate-50 hover:text-cyan-800',
    usercard:
      'w-full py-4 px-4 text-white rounded-md bg-slate-500 transition hover:bg-slate-50 hover:text-cyan-800',
    form: 'w-full py-4 px-4 text-white rounded-full bg-slate-500 transition hover:bg-slate-50 hover:text-cyan-800',
  }

  const onClickHandler = async () => {
    // if (text === 'Delete') {
    //   if (confirm('정말 삭제하시겠습니까?')) {
    //     await axios
    //       .delete(`https://localhost:3000/api/posts/${id}`, {
    //         data: { id: id },
    //       })
    //       .then((res) => {
    //         console.log(res)
    //       })
    //       .catch((err) => {
    //         console.log(err)
    //       })
    //   }
    // }
  }

  return (
    <button onClick={onClickHandler} className={`${buttonVariants[variant]}`}>
      {text}
    </button>
  )
}

export default Button
