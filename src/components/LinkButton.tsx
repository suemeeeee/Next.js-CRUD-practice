import Link from 'next/link'

const LinkButton = ({
  href,
  text,
  variant,
}: {
  href: string
  text: string
  variant: string
}) => {
  interface VariantsType {
    [variant: string]: string
  }
  // tailwind 동적 스타일링
  const buttonVariants: VariantsType = {
    nav: 'w-full py-4 px-4 text-cyan-800 rounded-full bg-slate-200 transition hover:bg-slate-50 hover:text-cyan-800',
    usercard:
      'w-full py-4 px-4 flex justify-center items-center text-white rounded-md bg-slate-500 transition hover:bg-slate-50 hover:text-cyan-800',
    form: 'w-full py-4 px-4 text-white rounded-full bg-slate-500 transition hover:bg-slate-50 hover:text-cyan-800',
  }
  return (
    <Link href={href} className={`${buttonVariants[variant]}`}>
      {text}
    </Link>
  )
}

export default LinkButton
