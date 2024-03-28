import PageButton from './PageButton'

const SidePart = ({
  where,
  pages,
  currentPage,
}: {
  where: string
  pages: { pageNum: number }[]
  currentPage: number
}) => {
  const startPages = pages.slice(0, 2)
  const endPages = pages.slice(-2)
  const forwardPages = pages.slice(0, currentPage + 2)
  const backwardPages = pages.slice(currentPage - 3)
  return (
    <div className="flex flex-row">
      <button className="mr-4">⬅️ Previous</button>
      <PageButton
        pages={where === 'left' ? forwardPages : startPages}
      ></PageButton>
      <p>...</p>
      <PageButton
        pages={where === 'left' ? endPages : backwardPages}
      ></PageButton>
      <button className="ml-4">Next ➡️</button>
    </div>
  )
}

export default SidePart
