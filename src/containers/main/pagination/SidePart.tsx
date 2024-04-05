import PageButton from './PageButton'

const SidePart = ({
  where,
  totalPage,
  currentPage,
}: {
  where: string
  totalPage: number
  currentPage: number
}) => {
  const mapArr = Array.from({ length: totalPage }, (_, i) => i + 1)

  const startPages = mapArr.slice(0, 2)
  const endPages = mapArr.slice(-2)
  const forwardPages = mapArr.slice(0, currentPage + 2)
  const backwardPages = mapArr.slice(currentPage - 3)
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
