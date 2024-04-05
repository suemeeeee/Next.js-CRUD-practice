'use client'
import React, {
  RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import axios, { AxiosError, AxiosResponse } from 'axios'
import Link from 'next/link'
import { PageInfoType, PostType } from '@/types/postType'

const InfiniteScroll = ({ initPage }: { initPage: PageInfoType }) => {
  // 화면에 그릴 페이지 데이터
  // 가장 첫 이니셜 페이지 데이터로 초기값 지정
  const [postList, setPostList] = useState<PageInfoType>(initPage)

  // 타겟 요소에 부여할 ref 변수
  const targetRef: RefObject<HTMLDivElement> = useRef(null)

  // 타겟 요소가 화면에 노출되면(intersecting) 다음 페이지 데이터를 받아오는 함수
  const handelIntersect = useCallback(
    async ([entry]: IntersectionObserverEntry[]): Promise<void> => {
      // 타겟 요소의 정보가 담긴 entry배열에서 isIntersecting 값이 true라면 타겟 요소가 화면에 노출된 상태라는 것.
      if (entry.isIntersecting) {
        // 다음 페이지(currentPage + 1) 정보를 불러온다.
        await axios
          .get(
            `https://localhost:3000/api/posts?page=${postList.currentPage + 1}`,
          )
          .then((res: AxiosResponse) => {
            // 스프레드 연산자를 사용해서 이전 페이지 데이터에 붙여준다.
            setPostList((prev: PageInfoType) => {
              return {
                // count(전체 게시글 수), pageSize(페이지 당 게시글 수), totalPage(전체 페이지 수) 변수는 이전과 동일
                // posts와 currentPage에만 변화가 있다.
                ...prev,
                posts: [...prev.posts, ...res.data.data.posts],
                currentPage: res.data.data.currentPage,
              }
            })
          })
          .catch((err: AxiosError) => {
            console.error(err)
          })
      }
    },
    [postList?.currentPage],
  )

  useEffect(() => {
    // 새로운 observer 객체 생성한다.
    // 이때 root는 null로 주어 화면 크기를 기준으로 노출 여부를 계산하도록 하고
    // threshold는 0.8로 주어 타겟 요소가 80% 노출되면 다음 데이터 불러오도록 하여, 유저로 하여금 기다리는 시간이 안느껴지도록 한다.
    const observer: IntersectionObserver = new IntersectionObserver(
      handelIntersect,
      {
        threshold: 0.8,
        root: null,
      },
    )

    // current가 null일 수 있기 때문에 있는지 확인하고 있다면 targetRef(마지막 게시글)를 관찰대상으로 등록한다.
    targetRef.current && observer.observe(targetRef.current)

    return () => {
      // 언마운트 시 disconnect() 함수를 호출해서 구독을 해제한다.
      observer.disconnect()
    }
  }, [targetRef?.current])

  return (
    <div className="w-full">
      {postList?.posts.map((post: PostType, idx: number) => {
        // 받아온 게시글 수 === 현재 게시글의 인덱스 + 1 이면 (가장 마지막 게시글 아이템이면) targetRef 아니라면 null
        // 이후 각각의 게시글 아이템의 가장 바깥 div에 ref 값으로 넘겨준다.
        const ref = postList?.posts.length === idx + 1 ? targetRef : null
        return (
          <div
            key={post?.ps_id}
            ref={ref}
            className="flex flex-col content-around bg-slate-200 rounded-lg mt-4 mr-8"
          >
            <div className="h-40 flex flex-col mx-8 mt-8">
              <Link href={`/post/${post?.ps_id}`}>
                <h1 className="text-3xl ">{post?.subject}</h1>
              </Link>
              <section className="text-xl text-ellipsis overflow-hidden mt-4">
                {post?.content}
              </section>
            </div>
            <div className="flex justify-between px-8 py-4">
              <p>{post?.created_at}</p>
              <p>{post?.nickname}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default InfiniteScroll
