import React from 'react'
import styled from 'styled-components'
export const PaginationContainer = styled.ul`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 3rem;
  color: ${(props) => props.theme.secondary_300};
  display: ${({ $isShow }) => {
    return $isShow ? 'static' : 'none'
  }};
`

export const PageItem = styled.li`
  width: 3rem;
  height: 3rem;
  font-size: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border: solid 1px ${(props) => props.theme.general_500};
  :first-child {
    border-radius: 0.25rem 0 0 0.25rem;
  }

  :last-child {
    border-radius: 0 0.25rem 0.25rem 0;
  }

  :not(:first-child) {
    border-left: 0px;
  }
  color: ${(props) => props.theme.primary_300};
  &:hover {
    background-color: ${(props) => props.theme.primary_100};
  }
  background-color: ${({ $isCurrent }) => {
    return $isCurrent
      ? (props) => props.theme.primary_100
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
    <PaginationContainer $isShow={pageNumbers.length > 1 ? true : false}>
      {pageNumbers.map((number) => {
        return (
          <PageItem
            $isCurrent={number === currentPage ? true : false}
            key={number}
            onClick={() => {
              handleChangePage(number)
            }}
          >
            {number}
          </PageItem>
        )
      })}
    </PaginationContainer>
  )
}

export default Pagination
