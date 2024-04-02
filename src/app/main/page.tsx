import InfiniteScroll from '@/containers/main/InfiniteScroll'
import PostCard from '@/containers/main/PostCard'
import Pagination from '@/containers/main/pagination/Pagination'
import { getPosts } from '@/services/postsApi'
import { PageInfoType, PostType } from '@/types/postType'

const Main = async ({
  searchParams,
}: {
  searchParams?: {
    page?: string
  }
}) => {
  const query: string | undefined = searchParams?.page
  const data: PageInfoType = await getPosts(query)

  // Pagination 변수
  const posts: PostType[] = data.posts
  const currentPage: number = data.currentPage
  const totalPage: number = data.totalPage

  // infinite Scroll 변수
  const initPage: PageInfoType = await getPosts()

  return (
    <div className="w-full">
      {/* <div className="w-full overflow-y-auto mb-28">
        {posts.map((post: PostType) => (
          <div className="w-full mt-4">
            <PostCard post={post}></PostCard>
          </div>
        ))}
      </div>
      <div className="w-full flex justify-center absolute inset-x-0 bottom-12">
        <Pagination
          totalPage={totalPage}
          currentPage={currentPage}
        ></Pagination>
      </div> */}
      <InfiniteScroll initPage={initPage} />
    </div>
  )
}

export default Main
