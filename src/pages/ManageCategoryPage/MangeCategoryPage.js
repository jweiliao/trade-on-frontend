import styled from 'styled-components'
import Container from '../../components/Container'
import { PageTitle } from '../../components/heading'
import {
  BackstageSmallButton,
  GraySmallButton,
  DangerSmallButton,
} from '../../components/buttons'
import { Input } from '../../components/textField'
import { FaPlus } from 'react-icons/fa'
import { MEDIA_QUERY_SM } from '../../styles/breakpoints'
import Pagination from '../../components/Pagination/BackstagePagination'
import useCategories from '../../hooks/useCategories'

const InputWrapper = styled.form`
  width: 55%;
  margin: 1.5rem auto;
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

const Categories = styled.div``

const Category = styled.form`
  border-bottom: solid 0.1rem ${(props) => props.theme.general_500};
  font-size: 1.125rem;
  line-height: 1.5;
  padding: 1rem 0rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-left: 1rem;
`

const EditBtn = styled(BackstageSmallButton)`
  width: 3.75rem;
`

const DeleteBtn = styled(DangerSmallButton)`
  width: 3.75rem;
  margin-left: 1rem;
`

const SaveBtn = styled(EditBtn)`
  margin-left: 1rem;
`

const CancelBtn = styled(GraySmallButton)`
  width: 3.75rem;
`

const EditInput = styled(Input)`
  margin: 0;
  background: ${(props) => props.theme.general_100};
  &:focus {
    outline: none;
  }
`

const Content = styled.div`
  line-height: 1.5;
  text-align: justify;
  white-space: pre-line;
`

export default function ManageCategoryPage() {
  const {
    categories,
    handleNewCategory,
    handleAddCategory,
    categoryContentRef,
    newCategory,
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

  return (
    <Container>
      <PageTitle>物品分類管理</PageTitle>
      <InputWrapper>
        <AddBtn onClick={handleAddCategory}>
          <FaPlus />
        </AddBtn>
        <AddCategory
          ref={categoryContentRef}
          value={newCategory.categoryName}
          placeholder="輸入新分類"
          onChange={handleNewCategory}
        />
      </InputWrapper>
      <Categories>
        {currentCategories.map((category) => {
          return (
            <Category key={category.id}>
              {isUpdating === category.id ? (
                <>
                  <EditInput
                    id={category.id}
                    onChange={(e) => {
                      setEditValue(e.target.value)
                    }}
                    defaultValue={editValue ? editValue : category.categoryName}
                    type="text"
                  />
                  <ButtonsWrapper>
                    <CancelBtn
                      type="button"
                      editValue={!editValue}
                      onClick={() => {
                        setIsUpdating(false)
                        setEditValue('')
                      }}
                    >
                      取消
                    </CancelBtn>
                    <SaveBtn
                      type="submit"
                      editValue={editValue}
                      id={category.id}
                      onClick={(e) => {
                        handleEditMessage(e)
                      }}
                    >
                      更新
                    </SaveBtn>
                  </ButtonsWrapper>
                </>
              ) : (
                <>
                  <Content id={category.id}>{category.categoryName}</Content>
                  <ButtonsWrapper>
                    <EditBtn
                      onClick={(e) => {
                        setIsUpdating(category.id)
                      }}
                    >
                      編輯
                    </EditBtn>
                    <DeleteBtn
                      onClick={() => handleDeleteCategory(category.id)}
                    >
                      刪除
                    </DeleteBtn>
                  </ButtonsWrapper>
                </>
              )}
            </Category>
          )
        })}
      </Categories>
      <Pagination
        dataPerPage={categoriesPerPage}
        totalData={categories.length}
        handleChangePage={handleChangeCategoryPage}
        currentPage={currentCategoryPage}
      />
    </Container>
  )
}
