const ToastPopup = ({
  message,
  setToast,
}: {
  message: string
  setToast: any
}) => {
  return (
    <div
      className={`fixed z-20 flex h-[8rem] w-[50%]  items-center justify-center rounded-[0.5rem] bg-slate-500 `}
    >
      <p>{message}</p>
    </div>
  )
}

export default ToastPopup
