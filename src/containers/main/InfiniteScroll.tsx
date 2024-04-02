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
  const [postList, setPostList] = useState<PageInfoType>(initPage)
  const targetRef: RefObject<HTMLDivElement> = useRef(null)

  const handelIntersect = useCallback(
    ([entry]: IntersectionObserverEntry[]): void => {
      if (entry.isIntersecting) {
        axios
          .get(
            `https://localhost:3000/api/posts?page=${postList.currentPage + 1}`,
          )
          .then((res: AxiosResponse) => {
            setPostList((prev: PageInfoType) => {
              return {
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
    [postList.currentPage],
  )

  useEffect(() => {
    // 새로운 observer 객체 생성.
    const observer: IntersectionObserver = new IntersectionObserver(
      handelIntersect,
      {
        threshold: 0.8,
        root: null,
      },
    )

    // current가 null일 수 있기 때문에 있는지 확인하고 있다면 targetRef를 관찰대상으로 등록한다.
    targetRef.current && observer.observe(targetRef.current)

    return () => {
      observer.disconnect()
    }
  }, [targetRef.current])

  return (
    <div className="w-full">
      {postList?.posts.map((post: PostType, idx: number) => {
        const ref = postList.posts.length === idx + 1 ? targetRef : null
        return (
          <div
            key={post.ps_id}
            ref={ref}
            className="flex flex-col content-around bg-slate-200 rounded-lg mt-4 mr-8"
          >
            <div className="h-40 flex flex-col mx-8 mt-8">
              <Link href={`/post/${post.ps_id}`}>
                <h1 className="text-3xl ">{post.subject}</h1>
              </Link>
              <section className="text-xl text-ellipsis overflow-hidden mt-4">
                {post.content}
              </section>
            </div>
            <div className="flex justify-between px-8 py-4">
              <p>{post.created_at}</p>
              <p>{post.ps_id}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default InfiniteScroll
