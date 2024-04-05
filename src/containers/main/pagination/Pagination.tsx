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
  // 현재 페이지가 총 페이지 넘어서거나 0이면 error리턴
  if (totalPage < currentPage || currentPage < 0) return <>pagination error</>

  if (totalPage <= 8) {
    // ✅ 총 페이지 수가 8개 이하
    return <StaticPart totalPage={totalPage} />
  } else if (totalPage <= 11) {
    // ✅ 총 페이지 수가 9개 이상 11개 이하
    if (currentPage <= totalPage - 6) {
      if (currentPage <= 3) {
        // 제일 앞 3페이지까지는 5번까지 보임
        return <EndOfSide where="first" totalPage={totalPage} />
      } else {
        return (
          <SidePart
            where="left"
            totalPage={totalPage}
            currentPage={currentPage}
          />
        )
      }
    } else if (
      currentPage <=
      totalPage - 6 + (totalPage - (totalPage - 6) * 2)
    ) {
      // 현재 페이지가 중간 파트에 있을 때
      return <StaticPart totalPage={totalPage} />
    } else if (currentPage <= totalPage) {
      // 현재 페이지가 뒤 파트에 있을 때
      if (currentPage > totalPage - 3) {
        // 제일 뒤 3페이지까지는 5번까지 보임
        return <EndOfSide where="last" totalPage={totalPage} />
      }
      return (
        <SidePart
          where="right"
          totalPage={totalPage}
          currentPage={currentPage}
        />
      )
    }
  } else if (totalPage >= 13) {
    // ✅ 총 페이지 개수가 13개 이상
    if (currentPage <= 6) {
      // 현재 페이지가 앞 파트에 있을 때
      if (currentPage <= 3) {
        return <EndOfSide where="first" totalPage={totalPage} />
      } else {
        return (
          <SidePart
            where="left"
            totalPage={totalPage}
            currentPage={currentPage}
          />
        )
      }
    } else if (currentPage <= totalPage - 6) {
      // 현재 페이지가 중간 파트에 있을 때
      return <MiddlePart totalPage={totalPage} currentPage={currentPage} />
    } else if (currentPage <= totalPage) {
      // 현재 페이지가 뒤 파트에 있을 때
      if (currentPage > totalPage - 3) {
        return <EndOfSide where="right" totalPage={totalPage} />
      }
      return (
        <SidePart
          where="right"
          totalPage={totalPage}
          currentPage={currentPage}
        />
      )
    }
  } else if (totalPage === 12) {
    // ✅ 총 페이지 개수가 12개
    if (currentPage <= 6) {
      // 현재 페이지가 앞 파트에 있을 때
      if (currentPage <= 3) {
        return <EndOfSide where="first" totalPage={totalPage} />
      } else {
        return (
          <SidePart
            where="left"
            totalPage={totalPage}
            currentPage={currentPage}
          />
        )
      }
    } else if (currentPage <= totalPage) {
      // 현재 페이지가 뒤 파트에 있을 때
      if (currentPage > totalPage - 3) {
        // 제일 뒤 3페이지까지는 동일
        return <EndOfSide where="last" totalPage={totalPage} />
      }
      return (
        <SidePart
          where="right"
          totalPage={totalPage}
          currentPage={currentPage}
        />
      )
    }
  }
}

export default Pagination
