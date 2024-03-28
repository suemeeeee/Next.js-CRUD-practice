'use client'
import { usePathname, useSearchParams } from 'next/navigation'
const PageButton = ({ pages }: { pages: { pageNum: number }[] }) => {
  // 맑은 정신으로 다시하자 ...
  const searchParams = useSearchParams()
  const params = new URLSearchParams(searchParams)
  params.set('page', pages.toString())

  const onClickHandler = () => {}
  return (
    <div>
      {pages.map((page) => {
        return (
          <button onClick={onClickHandler} className="p-4">
            {page.pageNum}
          </button>
        )
      })}
    </div>
  )
}

export default PageButton
