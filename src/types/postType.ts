import { RowDataPacket } from 'mysql2'

// 개별 게시글 데이터 타입
// 게시글 id, 작성자, 제목, 내용, 생성일자, 수정일자
// sql execute 쿼리 결과값은 기본이 RowDataPacket 타입(배열)이기 때문에 확장해서 사용
export interface PostType extends RowDataPacket {
  ps_id: number
  nickname: string
  subject: string
  content: string
  created_at: string
  updated_at: string
}

// 페이지 정보 데이터 타입
// 게시글 리스트, 총 게시글 수, 페이지당 게시글 수, 현재 페이지 번호, 전체 페이지 번호
export interface PageInfoType {
  posts: PostType[]
  count: number
  pageSize: number
  currentPage: number
  totalPage: number
}
