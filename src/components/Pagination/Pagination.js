import React from 'react'
import styled from 'styled-components'
export const PaginationContainer = styled.ul`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 3rem;
  color: ${(props) => props.theme.secondary_300};
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
  :not(:first-child) {
    border-left: 0px;
  }
  color: ${(props) => props.theme.primary_300};
  &:hover {
    background-color: ${(props) => props.theme.primary_100};
  }
`

export const Pagination = ({ postsPerPage, totalPosts, handleChangePage }) => {
  const pageNumbers = []

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i)
  }

  return (
    <PaginationContainer>
      {pageNumbers.map((number) => {
        return (
          <PageItem
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
