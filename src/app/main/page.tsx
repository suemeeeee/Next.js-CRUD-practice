import PostCard from '@/containers/main/PostCard'
import Pagination from '@/containers/main/pagination/Pagination'
import { getPosts } from '@/services/postsApi'
import { PostType, getPostsType } from '@/types/postType'

const Main = async ({
  searchParams,
}: {
  searchParams?: {
    page?: string
  }
}) => {
  const query: string | undefined = searchParams?.page
  const data: getPostsType = await getPosts(query)

  const posts: PostType[] = data.data.posts
  const currentPage: number = data.data.currentPage
  const totalPage: number = data.data.totalPage

  return (
    <div className="w-full h-full flex flex-col justify-center items-center relative">
      <div className="w-full overflow-y-auto mb-28">
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
      </div>
    </div>
  )
}

export default Main
