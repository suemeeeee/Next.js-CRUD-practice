import EditForm from '@/containers/edit/EditForm'
import { getPostApi } from '@/services/posts'
import axios from 'axios'

const Edit = async ({ params }: { params: { id: string } }) => {
  // const id = params.id
  // // any 수정하기
  // const post: any = await getPostApi(id)

  // axios 버전 : 캐싱 기능 필요 없어서 axios 사용함.
  const post = await axios
    .get(`https://localhost:3000/api/posts/${params.id}`)
    .then((res) => {
      if (res.status === 200) {
        return res.data[0]
      } else {
        console.log('데이터를 가져오는 데 실패했습니다. 상태코드:', res.status)
      }
    })
    .catch((err) => {
      console.log('서버 통신에 에러가 발생했습니다. Err:', err)
    })

  // fetch 사용 버전 : 해당 api 요청에서 받은 값을 캐싱 해 줌
  // const post = await fetch(`https://localhost:3000/api/posts/${params.id}`)
  //   .then((res) => {
  //     if (!res.ok) {
  //       throw new Error('에러 발생')
  //     }
  //     return res.json()
  //   })
  //   .then((json) => {
  //     return json[0]
  //   })
  //   .catch((err) => console.log('err: ', err))

  return (
    <div className="w-3/4 h-full">
      <EditForm post={post} />
    </div>
  )
}
export default Edit
