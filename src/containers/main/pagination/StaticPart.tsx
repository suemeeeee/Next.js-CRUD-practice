import PageButton from './PageButton'
const StaticPart = ({ totalPage }: { totalPage: number }) => {
  const mapArr = Array.from({ length: totalPage }, (_, i) => i + 1)
  return (
    <div className="flex flex-row">
      <button className="mr-4">⬅️ Previous</button>
      <PageButton pages={mapArr}></PageButton>
      <button className="ml-4">Next ➡️</button>
    </div>
  )
}

export default StaticPart
