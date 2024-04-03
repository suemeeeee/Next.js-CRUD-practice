import { useEffect } from 'react'

const ToastPopup = ({
  message,
  setToast,
}: {
  message: string
  setToast: any
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      setToast(false)
    }, 2000)
    return () => {
      clearTimeout(timer)
    }
  }, [setToast])

  return (
    <div
      className={`flex flex-col text-white text-lg fixed z-20 flex h-[14rem] w-[30%] rounded-[0.5rem] bg-slate-500`}
    >
      <div className="w-full">
        <button
          onClick={() => {
            setToast(false)
          }}
          className="float-right mt-3 mr-3 px-4 py-2 rounded-full"
        >
          ✕
        </button>
      </div>
      <div className="text-center mt-10">
        <p>{message}</p>
      </div>
    </div>
  )
}

export default ToastPopup
