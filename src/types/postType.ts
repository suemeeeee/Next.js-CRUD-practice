export interface PostType {
  ps_id: number
  nickname: string
  subject: string
  content: string
  created_at: string
  updated_at: string
}

export interface getPostsType {
  data: {
    posts: PostType[]
    count: number
    pageSize: number
    currentPage: number
    totalPage: number
  }
}
