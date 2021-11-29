import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { BackstageTitle } from '../../components/heading'
import { BackstageSmallButton } from '../../components/buttons'
import { FaPlus, FaPen, FaTrash } from 'react-icons/fa'
import { MEDIA_QUERY_SM } from '../../styles/breakpoints'
import Pagination from '../../components/Pagination/BackstagePagination'
import useCategories from '../../hooks/useCategories'

const Form = styled.form``

const Title = styled(BackstageTitle)``

const InputWrapper = styled.div`
  width: 55%;
  margin: 0 auto;
  margin: 4rem auto 3rem;
  position: relative;
  ${MEDIA_QUERY_SM} {
    width: 80%;
  }
`

const AddCategory = styled.input`
  display: inline-block;
  border: none;
  border-bottom: solid 0.0625rem ${(props) => props.theme.general_500};
  height: 2.5rem;
  width: 100%;
  padding: 0 0.5rem 0 1.5rem;
  outline: none;
  font-size: 1.125rem;
  line-height: 1.5;
`

const AddBtn = styled.button`
  border: none;
  background: ${(props) => props.theme.general_000};
  cursor: pointer;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
`

const Category = styled.div`
  border-bottom: solid 0.1rem ${(props) => props.theme.general_500};
  width: 80%;
  margin: 0 auto 2rem;
  font-size: 1.125rem;
  line-height: 1.5;
  padding: 0.5rem;
  display: flex;
  justify-content: space-between;
`

const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: center;
`

const EditBtn = styled.button`
  border: none;
  background: ${(props) => props.theme.general_000};
  cursor: pointer;
  margin: 0 1rem;
`

const DeleteBtn = styled(EditBtn)``

// const PageButtonsWrapper = styled(ButtonsWrapper)`
//   margin: 5rem auto 3rem;
//   ${MEDIA_QUERY_SM} {
//     flex-direction: column-reverse;
//     align-items: center;
//   }
// `

// const SaveBtn = styled(BackstageSmallButton)`
//   margin: 1rem 2rem;
//   ${MEDIA_QUERY_SM} {
//     width: 50%;
//   }
// `

// const CancelBtn = styled(SaveBtn)`
//   background-color: ${(props) => props.theme.general_100};
//   &:hover {
//     background-color: ${(props) => props.theme.general_200};
//   }
// `

export default function ManageCategoryPage() {
  const { categories, setCategories, handleDeleteCategory } = useCategories()

  console.log(categories)

  return (
    <Form>
      <Title>物品分類管理</Title>
      <InputWrapper>
        <AddBtn>
          <FaPlus />
        </AddBtn>
        <AddCategory></AddCategory>
      </InputWrapper>
      {categories.map((category) => {
        return (
          <Category key={category.id}>
            {category.categoryName}
            <ButtonsWrapper>
              <EditBtn>
                <FaPen />
              </EditBtn>
              <DeleteBtn onClick={() => handleDeleteCategory(category.id)}>
                <FaTrash />
              </DeleteBtn>
            </ButtonsWrapper>
          </Category>
        )
      })}

      {/* <Category>未分類</Category>

      <Category>
        居家用品
        <ButtonsWrapper>
          <EditBtn>
            <FaPen />
          </EditBtn>
          <DeleteBtn>
            <FaTrash />
          </DeleteBtn>
        </ButtonsWrapper>
      </Category> */}

      {/* <PageButtonsWrapper>
        <CancelBtn>取消</CancelBtn>
        <SaveBtn>儲存</SaveBtn>
      </PageButtonsWrapper> */}

      {/* <Pagination
        dataPerPage={faqsPerPage}
        totalData={faqs.length}
        handleChangePage={handleChangePage}
      /> */}
    </Form>
  )
}
