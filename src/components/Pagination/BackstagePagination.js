import React from 'react'
import styled from 'styled-components'
import { PaginationContainer, PageItem } from './Pagination'

const BackstagePageItem = styled(PageItem)`
  &:hover {
    background-color: ${(props) => props.theme.secondary_100};
  }
  background-color: ${({ $isCurrent }) => {
    return $isCurrent
      ? (props) => props.theme.secondary_100
      : (props) => props.theme.general_000
  }};
`

export const Pagination = ({
  dataPerPage,
  totalData,
  handleChangePage,
  currentPage,
}) => {
  const pageNumbers = []

  for (let i = 1; i <= Math.ceil(totalData / dataPerPage); i++) {
    pageNumbers.push(i)
  }

  return (
    <PaginationContainer $isShow={pageNumbers.length > 1}>
      {pageNumbers.map((number) => {
        return (
          <BackstagePageItem
            $isCurrent={number === currentPage}
            key={number}
            onClick={() => {
              handleChangePage(number)
            }}
          >
            {number}
          </BackstagePageItem>
        )
      })}
    </PaginationContainer>
  )
}

export default Pagination
