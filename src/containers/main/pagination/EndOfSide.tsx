import PageButton from './PageButton'
const EndOfSidePart = ({
  where,
  totalPage,
}: {
  where: string
  totalPage: number
}) => {
  const mapArr = Array.from({ length: totalPage }, (_, i) => i + 1)

  const startPages = mapArr.slice(0, 2)
  const endPages = mapArr.slice(-2)
  const fivePages = where === 'first' ? mapArr.slice(0, 5) : mapArr.slice(-5)

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
