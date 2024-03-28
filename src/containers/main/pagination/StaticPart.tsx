import PageButton from './PageButton'
const StaticPart = ({ pages }: { pages: { pageNum: number }[] }) => {
  return (
    <div className="flex flex-row">
      <button className="mr-4">⬅️ Previous</button>
      <PageButton pages={pages}></PageButton>
      <button className="ml-4">Next ➡️</button>
    </div>
  )
}

export default StaticPart
