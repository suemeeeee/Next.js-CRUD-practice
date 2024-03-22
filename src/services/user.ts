import { revalidatePath } from 'next/cache'

// users list GET
export async function getUsersDataApi() {
  try {
    const response = await fetch('https://reqres.in/api/users')
    const json = await response.json()

    if (response.status === 200) {
      console.log('유저리스트 정보 조회 성공. status code :', response.status)
      return json.data
    } else {
      console.log('유저리스트 정보 조회 실패. status code :', response.status)
    }
  } catch (error) {
    console.log('서버와의 통신 중 오류가 발생했습니다.', error)
  }
}

// 특정 user data GET
export async function getUserDataApi(id: string) {
  try {
    const response = await fetch(`https://reqres.in/api/users/${id}`)
    const json = await response.json()

    if (response.status === 200) {
      console.log('유저 정보 조회 성공. status code :', response.status)
      return json.data
    } else {
      console.log('유저 정보 조회에 실패. status code :', response.status)
    }
  } catch (error) {
    console.log('서버와의 통신 중 오류가 발생했습니다.', error)
  }
}

// 새로운 user data POST
export async function createUserDataApi(formData: FormData) {
  'use server'

  const newUserData = {
    name: formData.get('name'),
    job: formData.get('job'),
    age: formData.get('age'),
  }

  // mutaute code
  try {
    const response = await fetch('https://reqres.in/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUserData),
    })
    if (response.status === 201) {
      console.log('유저 생성 성공. status code:', response.status)
    } else {
      console.error('유저 생성 실패. status code:', response.status)
    }
  } catch (error) {
    console.error('서버와의 통신 중 오류가 발생했습니다.', error)
  }
}

// 특정 user 삭제 API
export async function deleteUserDataApi(id: number) {
  'use server'

  try {
    const response = await fetch(`https://reqres.in/api/${id}`, {
      method: 'DELETE',
    })
    if (response.ok) {
      console.log('유저 삭제 성공. status code:', response.status)
    } else {
      console.error('유저 삭제 실패. status code:', response.status)
    }
  } catch (error) {
    console.error('서버와의 통신 중 오류가 발생했습니다.', error)
  }

  revalidatePath('/main')
}
