import Link from 'next/link'
import Button from './Button'

const Nav = () => {
  return (
    <div className="w-full h-screen flex flex-col items-center bg-slate-500">
      <div className="w-full h-20 mt-12 flex justify-center items-center">
        <Link href={'/main'} className="h-4/5 text-white text-5xl">
          LOGO
        </Link>
      </div>
      <div className="flex flex-col mt-28 items-center">
        <div className="w-full m-4">
          <Link href={'/main'}>
            <Button text="Main" variant="nav" />
          </Link>
        </div>
        <div className="w-full m-4">
          <Link href={'/create'}>
            <Button text="Create New Profile" variant="nav" />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Nav
