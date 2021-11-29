import React from 'react'
import styled from 'styled-components'
import { PaginationContainer, PageItem } from './Pagination'

const BackstagePageItem = styled(PageItem)`
  color: ${(props) => props.theme.secondary};
  &:hover {
    background-color: ${(props) => props.theme.secondary_100};
  }
`

export const Pagination = ({ dataPerPage, totalData, handleChangePage }) => {
  const pageNumbers = []

  for (let i = 1; i <= Math.ceil(totalData / dataPerPage); i++) {
    pageNumbers.push(i)
  }

  return (
    <PaginationContainer>
      {pageNumbers.map((number) => {
        return (
          <BackstagePageItem
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
