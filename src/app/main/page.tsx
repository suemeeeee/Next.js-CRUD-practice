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
  // infinite Scroll 변수
  const initPage: PageInfoType = await getPosts()

  // // Pagination 변수
  const data: PageInfoType = await getPosts(query)
  const posts: PostType[] = data.posts
  const currentPage: number = data.currentPage
  const totalPage: number = data.totalPage

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="w-full overflow-y-auto mb-28">
        {posts.map((post: PostType) => (
          <div className="w-full mt-4">
            <PostCard post={post}></PostCard>
          </div>
        ))}
      </div>
      <div className="flex justify-center bottom-12">
        <Pagination
          totalPage={totalPage}
          currentPage={currentPage}
        ></Pagination>
      </div>
      {/* <InfiniteScroll initPage={initPage} /> */}
    </div>
  )
}

export default Main
