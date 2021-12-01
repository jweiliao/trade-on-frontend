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
const PageButtonsWrapper = styled(ButtonsWrapper)`
  // margin: 5rem auto 3rem;
  ${MEDIA_QUERY_SM} {
    flex-direction: column-reverse;
    align-items: center;
  }
`

const EditBtn = styled.button`
  border: none;
  background: ${(props) => props.theme.general_000};
  cursor: pointer;
  margin: 0 1rem;
`

const DeleteBtn = styled(EditBtn)``

const EditInput = styled.input`
  font-size: 14px;
  &:focus {
    outline: none;
  }
  border: ${(props) => props.theme.general_200} solid 2px;
  border-radius: 4px;
  margin-top: 10px;
  line-height: 1.5em;
  // padding-left: 5px;
  // min-width: 80%;
  padding: 5px;
  background: ${(props) => props.theme.general_100};
  ${MEDIA_QUERY_SM} {
    min-width: 40%;
  }
`

const EditWrapper = styled.div`
  display: flex;
  // flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  ${MEDIA_QUERY_SM} {
    flex-direction: column;
  }
`

const Content = styled.div`
  margin: 5px 0 8px 0;
  font-size: 16px;
  line-height: 1.5;
  text-align: justify;
  white-space: pre-line;
`

const SaveBtn = styled(BackstageSmallButton)`
  // margin: 1rem 2rem;
  margin: 1rem;
  ${MEDIA_QUERY_SM} {
    width: 100%;
  }
`

const CancelBtn = styled(SaveBtn)`
  background-color: ${(props) => props.theme.general_100};
  &:hover {
    background-color: ${(props) => props.theme.general_200};
  }
  ${MEDIA_QUERY_SM} {
    width: 100%;
  }
`

export default function ManageCategoryPage() {
  const {
    categories,
    setCategories,
    handleNewCategory,
    handleAddCategory,
    categoryCotentRef,
    newCategory,
    handleEditClick,
    handleEditMessage,
    isUpdating,
    setIsUpdating,
    editValue,
    setEditValue,
    handleDeleteCategory,
    currentCategories,
    categoriesPerPage,
    currentCategoryPage,
    handleChangeCategoryPage,
  } = useCategories()

  console.log(categories)

  return (
    <Form>
      <Title>物品分類管理</Title>
      <InputWrapper>
        <AddBtn onClick={handleAddCategory}>
          <FaPlus />
        </AddBtn>
        <AddCategory
          ref={categoryCotentRef}
          value={newCategory.categoryName}
          placeholder="輸入新分類"
          onChange={handleNewCategory}
        ></AddCategory>
      </InputWrapper>
      {currentCategories.map((category) => {
        return (
          <Category key={category.id}>
            {/* {category.categoryName} */}
            {isUpdating ? (
              <EditWrapper>
                <EditInput
                  id={category.id}
                  onChange={(e) => {
                    setEditValue(e.target.value)
                  }}
                  defaultValue={editValue ? editValue : category.categoryName}
                  type="text"
                />
                <ButtonsWrapper>
                  <SaveBtn
                    editValue={editValue}
                    id={category.id}
                    onClick={(e) => {
                      handleEditMessage(e)
                    }}
                  >
                    送出
                  </SaveBtn>
                  <CancelBtn
                    editValue={!editValue}
                    onClick={() => {
                      setIsUpdating(false)
                      setEditValue('')
                    }}
                  >
                    取消編輯
                  </CancelBtn>
                </ButtonsWrapper>
              </EditWrapper>
            ) : (
              <Content id={category.id}>{category.categoryName}</Content>
            )}
            <PageButtonsWrapper>
              <EditBtn onClick={handleEditClick}>
                <FaPen />
              </EditBtn>
              <DeleteBtn onClick={() => handleDeleteCategory(category.id)}>
                <FaTrash />
              </DeleteBtn>
            </PageButtonsWrapper>
          </Category>
        )
      })}

      <Pagination
        dataPerPage={categoriesPerPage}
        totalData={categories.length}
        handleChangePage={handleChangeCategoryPage}
        currentPage={currentCategoryPage}
      />
    </Form>
  )
}
