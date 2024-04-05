'use client'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'

const PageButton = ({ pages }: { pages: number[] }) => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const currentPage = Number(searchParams.get('page')) || 1

  console.log(currentPage)

  return (
    <div>
      {pages.map((idx) => {
        return (
          <Link
            href={`${pathname}/?page=${idx}`}
            key={idx}
            className={
              currentPage === idx
                ? 'px-4 py-3 rounded bg-slate-500 text-white'
                : 'px-4 py-3'
            }
          >
            {idx}
          </Link>
        )
      })}
    </div>
  )
}

export default PageButton
