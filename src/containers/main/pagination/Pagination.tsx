// 🍀 깃허브 이슈 페이지네이션 로직 정리
// 1. 전체 페이지가 13이상일 경우(13~): 앞 6개 / ...나머지 중간 부분... / 뒤 6개
//    앞 부분 6개
//        - 3개 이후부터 현재 페이지 뒤로 2개 보여줌 (ex. 1 ~ 3(현재), 4, 5... / 1 ~ 4(현재), 5, 6.../ 1 ~ 6(현재), 7, 8...)
//        - 그 뒷 부분은 ... + 제일 끝 페이지 2개
//    중간 부분
//        - 제일 앞 2개 ... 중간 부분 5개 ... 제일 뒤 2개
//        - ex. 1, 2 ... 5, 6, 7(현재), 8, 9 ... 47, 48 / 1, 2 ... 40, 41, 42(현재), 43, 44 ... 47, 48
//    뒷 부분 6개
//        - 뒤쪽 부분도 마찬가지로 3개 남기전까지 현재 페이지부터 앞으로 2개 보여줌 (ex. ... 42, 43, 44(현재) ~ 48)
//        - 그 앞 부분은 제일 첫 페이지 2개 + ...
// 2. 전체 페이지가 9이상 11이하일 경우(9~11): 전체 페이지-6개 / 나머지 중간 부분 / 전체 페이지-6개
//    앞 부분 (전체 페이지 - 6개)
//        - 1번의 앞 부분과 동일
//    중간 부분 (전체 페이지 - (전체 페이지 - 6) * 2 : 즉, 앞 뒤로 전체 페이지 - 6개씩 파트 나누고 남은 애들)
//        - 3번과 동일. 다 보임
//    뒷 부분 (전체 페이지 - 6개)
//        - 1번 뒷 부분과 동일
// 3. 전체 페이지가 12일 경우: 전체 페이지 - 6개 / 나머지 (앞, 뒤 두 부분 밖에 없음. 1번에서 중간이 사라진 것.)
//    앞 부분
//        - 1번 앞 부분과 동일
//    뒷 부분
//        - 1번 뒷 부분과 동일
// 4. 전체 페이지가 8이하일 경우(1~8): static pagination 버튼 (전체 보임)

//  1, 2 공통: 1~3페이지까지는 앞 파트 1, 2, 3, 4, 5 ... 제일 끝 페이지 2개
// 필요한 변수: 전체 페이지 수, 현재 페이지 번호
import StaticPart from './StaticPart'
import EndOfSide from './EndOfSide'
import SidePart from './SidePart'
import MiddlePart from './MiddlePart'

const Pagination = ({
  totalPage,
  currentPage,
}: {
  totalPage: number
  currentPage: number
}) => {
  // page dummy data
  const pages1 = [
    { pageNum: 1 },
    { pageNum: 2 },
    { pageNum: 3 },
    { pageNum: 4 },
    { pageNum: 5 },
    { pageNum: 6 },
    { pageNum: 7 },
    { pageNum: 8 },
    { pageNum: 9 },
    { pageNum: 10 },
    { pageNum: 11 },
    { pageNum: 12 },
    { pageNum: 13 },
    { pageNum: 14 },
    { pageNum: 15 },
    { pageNum: 16 },
    { pageNum: 17 },
    { pageNum: 18 },
    { pageNum: 19 },
    { pageNum: 20 },
  ]
  const pages2 = [
    { pageNum: 1 },
    { pageNum: 2 },
    { pageNum: 3 },
    { pageNum: 4 },
    { pageNum: 5 },
    { pageNum: 6 },
    { pageNum: 7 },
    { pageNum: 8 },
    { pageNum: 9 },
    { pageNum: 10 },
    { pageNum: 11 },
  ]
  const pages3 = [
    { pageNum: 1 },
    { pageNum: 2 },
    { pageNum: 3 },
    { pageNum: 4 },
    { pageNum: 5 },
    { pageNum: 6 },
    { pageNum: 7 },
    { pageNum: 8 },
    { pageNum: 9 },
    { pageNum: 10 },
    { pageNum: 11 },
    { pageNum: 12 },
  ]
  const pages4 = [{ pageNum: 1 }, { pageNum: 2 }, { pageNum: 3 }]

  // 현재 페이지가 총 페이지 넘어서거나 0이면 error리턴
  if (totalPage < currentPage || currentPage <= 0) return <>pagination error</>

  if (totalPage <= 8) {
    // 총 페이지 수가 8개 이하일 때.
    // 4번 타입 (static pagination)
    return <StaticPart pages={pages4} />
  } else if (totalPage <= 11) {
    // 총 페이지 수가 9개 이상 11개 이하일 때
    // 2번 타입
    if (currentPage <= 5) {
      if (currentPage <= 3) {
        // 제일 앞 3페이지까지는 동일
        return <EndOfSide where="first" pages={pages2} />
      } else {
        return (
          <SidePart where="left" pages={pages2} currentPage={currentPage} />
        )
      }
    } else if (
      currentPage > totalPage - 6 &&
      currentPage <= totalPage - 6 + totalPage - (totalPage - 6) * 2
    ) {
      // 현재 페이지가 중간 파트에 있을 때
      return <StaticPart pages={pages2} />
    } else if (currentPage <= totalPage - 3) {
      // 현재 페이지가 뒤 파트에 있을 때
      return <SidePart where="right" pages={pages2} currentPage={currentPage} />
    } else if (currentPage > totalPage - 3) {
      // 제일 뒤 3페이지까지는 동일
      return <EndOfSide where="last" pages={pages2} />
    }
  } else if (totalPage >= 13) {
    // 1번 타입
    if (currentPage <= 6) {
      // 현재 페이지가 앞 파트에 있을 때
      if (currentPage <= 3) {
        return <EndOfSide where="first" pages={pages1} />
      } else {
        return (
          <SidePart where="left" pages={pages1} currentPage={currentPage} />
        )
      }
    } else if (currentPage < totalPage - 5) {
      // 현재 페이지가 중간 파트에 있을 때
      return <MiddlePart pages={pages1} currentPage={currentPage} />
    } else if (currentPage <= totalPage) {
      // 현재 페이지가 뒤 파트에 있을 때
      if (currentPage > totalPage - 3) {
        // 제일 뒤 3페이지까지는 동일
        return <EndOfSide where="right" pages={pages1} />
      }
      return <SidePart where="right" pages={pages1} currentPage={currentPage} />
    }
  } else if (totalPage === 12) {
    // 3번 타입
    if (currentPage <= 6) {
      // 현재 페이지가 앞 파트에 있을 때
      if (currentPage <= 3) {
        return <EndOfSide where="first" pages={pages1} />
      } else {
        return (
          <SidePart where="left" pages={pages1} currentPage={currentPage} />
        )
      }
    } else if (currentPage <= totalPage) {
      // 현재 페이지가 뒤 파트에 있을 때
      if (currentPage > totalPage - 3) {
        // 제일 뒤 3페이지까지는 동일
        if (currentPage > totalPage - 3) {
          // 제일 뒤 3페이지까지는 동일
          return <EndOfSide where="right" pages={pages1} />
        }
        return (
          <SidePart where="right" pages={pages1} currentPage={currentPage} />
        )
      }
    }
  }
}

export default Pagination
