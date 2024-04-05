import PageButton from './PageButton'

const MiddlePart = ({
  totalPage,
  currentPage,
}: {
  totalPage: number
  currentPage: number
}) => {
  const mapArr: number[] = Array.from({ length: totalPage }, (_, i) => i + 1)

  const startPages = mapArr.slice(0, 2)
  const middlePages = mapArr.slice(currentPage - 3, currentPage + 2)
  const endPages = mapArr.slice(-2)

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
