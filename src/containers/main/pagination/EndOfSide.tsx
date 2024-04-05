import PageButton from './PageButton'
const EndOfSidePart = ({
  where,
  totalPage,
}: {
  where: string
  totalPage: number
}) => {
  const mapArr: number[] = Array.from({ length: totalPage }, (_, i) => i + 1)

  // 위에서 mapArr: number[]라고 1차로 타입 지정함. 그 변수를 slice하기만 하기 때문에 당연히 number[]타입일 것. 따라서 추론에 맏기고 타입 지정 X
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
