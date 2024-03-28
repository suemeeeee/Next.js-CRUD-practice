import PageButton from './PageButton'

const MiddlePart = ({
  pages,
  currentPage,
}: {
  pages: { pageNum: number }[]
  currentPage: number
}) => {
  const startPages = pages.slice(0, 2)
  const middlePages = pages.slice(currentPage - 3, currentPage + 2)
  const endPages = pages.slice(-2)

  return (
    <div className="flex flex-row">
      <button className="mr-4">⬅️ Previous</button>
      <PageButton pages={startPages}></PageButton>
      <p>...</p>
      <PageButton pages={middlePages}></PageButton>
      <p>...</p>
      <PageButton pages={endPages}></PageButton>
      <button className="ml-4">Next ➡️</button>
    </div>
  )
}

export default MiddlePart
