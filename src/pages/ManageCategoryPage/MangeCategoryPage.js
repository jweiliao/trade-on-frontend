import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { BackstageTitle } from '../../components/heading'
import { BackstageSmallButton } from '../../components/buttons'
import { FaPlus, FaPen, FaTrash } from 'react-icons/fa'
import { MEDIA_QUERY_SM } from '../../styles/breakpoints'
import Pagination from '../../components/Pagination/BackstagePagination'

import useCategories from '../../hooks/useCategories'

import {
  getAllCategories,
  addCategory,
  updateCategory,
  deleteCategory,
} from '../../WebAPI'
import Swal from 'sweetalert2'
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
  const {
    categories,
    setCategories,
    handleDeleteCategory,
    handleAddCategory,
    handleNewCategory,
    categoryCotentRef,
    newCategory,
  } = useCategories()

  console.log(categories)

  // 儲存是否正在 edit 的狀態
  const [isUpdating, setIsUpdating] = useState(false)
  const [editValue, setEditValue] = useState('')

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

//   // 點擊 '編輯' 後，更新 isUpdating 的編輯狀態為 true
//   const handleEditClick = () => {
//     setIsUpdating(true)
//   }
//   const handleEditMessage = async (e) => {
//     const categoryId = e.target.id
//     console.log(categoryId)
//     if (editValue === '') {
//       e.preventDefault()
//     }
//     const editData = {
//       categoryName: editValue,
//       compareId: categoryId,
//     }
//     console.log(editData)
//     try {
//       await updateCategory(editData.compareId, editData).then((res) => {
//         console.log(res)
//         console.log(res.data)
//         if (res.data.message === 'success') {
//           //跳出 "更新成功"的彈窗提示
//           Swal.fire({
//             icon: 'success',
//             title: '更新成功',
//             showConfirmButton: false,
//             timer: 1500,
//           })
//           setIsUpdating(false)
//         }
//       })
//     } catch (err) {
//       console.log(err)
//       Swal.fire('請稍候再試一次!', 'error')
//     }
//     setEditValue('')
//   }

//       {/* todo: 如何默認為 "未分類" */}
//       {/* <Category>未分類</Category> */}
//       {manageCategories.map((category) => {
//         return (
//           <>
//             <Category key={category.id}>
//               {/* {category.categoryName} */}
//               {isUpdating ? (
//                 <EditWrapper>
//                   <EditInput
//                     id={category.id}
//                     onChange={(e) => {
//                       setEditValue(e.target.value)
//                     }}
//                     defaultValue={editValue ? editValue : category.categoryName}
//                     type="text"
//                   />
//                   <ButtonsWrapper>
//                     <SaveBtn
//                       editValue={editValue}
//                       id={category.id}
//                       onClick={(e) => {
//                         handleEditMessage(e)
//                       }}
//                     >
//                       送出
//                     </SaveBtn>
//                     <CancelBtn
//                       editValue={!editValue}
//                       onClick={() => {
//                         setIsUpdating(false)
//                         setEditValue('')
//                       }}
//                     >
//                       取消編輯
//                     </CancelBtn>
//                   </ButtonsWrapper>
//                 </EditWrapper>
//               ) : (
//                 <Content id={category.id}>{category.categoryName}</Content>
//               )}
//               <PageButtonsWrapper>
//                 <EditBtn onClick={handleEditClick}>
//                   <FaPen />
//                 </EditBtn>
//                 <DeleteBtn onClick={() => handleDeleteClick(category.id)}>
//                   <FaTrash />
//                 </DeleteBtn>
//               </PageButtonsWrapper>
//             </Category>
//           </>
//         )
//       })}
//       {/* <PageButtonsWrapper>
//         <CancelBtn>取消</CancelBtn>
//         <SaveBtn>儲存</SaveBtn>
//       </PageButtonsWrapper> */}
//     </Form>
//   )
// }
