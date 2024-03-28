import PostCard from '@/containers/main/PostCard'
import Pagination from '@/containers/main/pagination/Pagination'

const Main = async () => {
  // // 전체 posts list GET
  // const posts = await fetch('https://localhost:3000/api/posts')
  //   .then((res) => {
  //     if (!res.ok) {
  //       throw new Error('에러 발생')
  //     }
  //     return res.json()
  //   })
  //   .catch((err) => console.log('err: ', err))

  // const totalPage = 11
  // const currentPage = 4

  const data = await fetch('https://localhost:3000/api/posts?page=1')
    .then((res) => {
      if (!res.ok) {
        throw new Error('에러 발생')
      }
      return res.json()
    })
    .catch((err) => console.log('err: ', err.message))

  // console.log(data)

  const currentPage = data.currentPage
  const totalPage = data.totalPage

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <div className="w-full h-full overflow-y-auto mb-4">
        {/* {paginated.map((post: Post) => (
          <div className="w-full mt-4">
            <PostCard post={post}></PostCard>
          </div>
        ))} */}
      </div>
      <Pagination totalPage={totalPage} currentPage={currentPage}></Pagination>
    </div>
  )
}

export default Main
