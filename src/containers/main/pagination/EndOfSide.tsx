import PageButton from './PageButton'
const EndOfSidePart = ({
  where,
  pages,
}: {
  where: string
  pages: { pageNum: number }[]
}) => {
  const startPages = pages.slice(0, 2)
  const endPages = pages.slice(-2)
  const fivePages = where === 'first' ? pages.slice(0, 5) : pages.slice(-5)
  return (
    <div className="flex flex-row">
      <button className="mr-4">⬅️ Previous</button>
      <PageButton
        pages={where === 'first' ? fivePages : startPages}
      ></PageButton>
      <p>...</p>
      <PageButton pages={where === 'first' ? endPages : fivePages}></PageButton>
      <button className="ml-4">Next ➡️</button>
    </div>
  )
}

export default EndOfSidePart
