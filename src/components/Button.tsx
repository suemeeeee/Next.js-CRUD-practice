const Button = ({
  text,
  variant,
  onClick,
}: {
  text: string
  variant: string
  onClick?: () => void
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

  return (
    <div>
      <button onClick={onClick} className={`${buttonVariants[variant]}`}>
        {text}
      </button>
    </div>
  )
}

export default Button
