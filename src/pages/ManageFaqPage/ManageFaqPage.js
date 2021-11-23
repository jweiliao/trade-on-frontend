import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { BackstageTitle, SubTitle } from '../../components/heading'
import Container from '../../components/Container'
import { SmallButton, DangerSmallButton } from '../../components/buttons'
import { MEDIA_QUERY_SM } from '../../styles/breakpoints'

// 引入 sweetalert2 彈窗套件
import Swal from 'sweetalert2'
// 引入 ManageFaqAdd 彈窗 component
import ManageFaqAdd from '../../components/ManageFaqAdd'
// 引入 ManageFaqEdit 彈窗 component
import ManageFaqEdit from '../../components/ManageFaqEdit'

// 引入 axios 與 deleteFaq 來串接後端的資料
import { getAllFaqs, deleteFaq } from '../../WebAPI'

/* 標題 */
const Title = styled(BackstageTitle)``

/* "新增問答" 按鈕 */
const AddNewFaqButton = styled(SmallButton)`
  background-color: ${(props) => props.theme.general_200};
  &:hover {
    background-color: ${(props) => props.theme.general_300};
  }
`

/* 所有問答內容的整個區塊 */
const FaqWrapper = styled.div`
  margin-top: 36px;
  margin-bottom: 50px;
  display: flex;
  flex-direction: column;
`

/* 每一條常見問題的整個區塊 */
const FaqContent = styled.div`
  margin-top: 36px;
  margin-bottom: 50px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  ${MEDIA_QUERY_SM} {
    flex-direction: column;
  }
`
/* 常見問題左邊：問題與回答 */
const FaqItems = styled.div`
  padding-bottom: 16px;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid ${(props) => props.theme.general_200};
  & + & {
    margin-top: 40px;
  }
`

/* 常見問題左邊：問題 */
const FaqQuestion = styled(SubTitle)`
  cursor: pointer;
`

/* 常見問題左邊：回答 */
const FaAnswer = styled.div`
  margin-top: 20px;
  font-size: 16px;
  line-height: 1.5;
  letter-spacing: 0.5px;
`

/* 常見問題右邊：更新的按鈕們 */
const FaqUpdateWrapper = styled.div`
  display: flex;
  ${MEDIA_QUERY_SM} {
    margin-top: 20px;
  }
`

/* 常見問題右邊："編輯" 按鈕 */
const FaqEditButton = styled(SmallButton)`
  width: 60px;
  background-color: ${(props) => props.theme.general_200};
  &:hover {
    background-color: ${(props) => props.theme.general_300};
  }
`
/* 常見問題右邊："刪除" 按鈕 */
const FaqDeleteButton = styled(DangerSmallButton)`
  width: 60px;
  margin-left: 10px;
`
// const FaqConfirmWrapper = styled.div`
//   display: flex;
//   justify-content: center;
// `
// const FaqCancelButton = styled(SmallButton)`
//   background-color: ${(props) => props.theme.general_200};
//   &:hover {
//     background-color: ${(props) => props.theme.general_300};
//   }
// `
// const FaqSaveButton = styled(SmallButton)`
//   margin-left: 27px;
// `

export default function ManageFaqPage() {
  // 設定問答資料 state
  const [manageFaqData, setManageFaqData] = useState([])

  // 設定是否顯示新增問答的彈窗的 state，預設 false（不顯示彈窗）
  const [addPopUp, setAddPopUp] = useState(false)

  // 設定是否顯示編輯問答的彈窗的 state，預設 false（不顯示彈窗）
  const [editPopUp, setEditPopUp] = useState(false)

  // 第一次進入頁面時，撈後端資料，並帶入 manageFaqData 的 state
  useEffect(() => {
    getAllFaqs
      .then((res) => {
        setManageFaqData(res.data.allQAs)
        console.log(res.data.allQAs)
      })
      .catch((err) => console.log(err))
  }, [])

  // 當點擊 "新增問答" 的按鈕時，執行 handleAddFaqClick
  // => 更新 addPopUp 的 state（toggle 彈窗：若原本無顯示彈窗，則打開；若已顯示彈窗，則關閉）
  const handleAddFaqClick = () => {
    setAddPopUp(!addPopUp)
  }

  // 當點擊 "編輯" 的按鈕時，執行 handleEditFaqClick
  // => 更新 editPopUp 的 state（toggle 彈窗：若原本無顯示，則打開彈窗；若已顯示，則關閉彈窗）
  const handleEditFaqClick = (id) => {
    setEditPopUp(!editPopUp)
    console.log(id)
  }

  const closeModal = () => {
    setAddPopUp(false)
    setEditPopUp(false)
  }
  // 當點擊 "刪除" 按鈕時，執行 handleDeleteQA
  const handleDeleteQA = async (faqId) => {
    console.log(faqId)
    try {
      // 顯示再次確認刪除的彈窗
      await Swal.fire({
        title: '刪除', // 標題
        text: '確定要刪除嗎？', // 內文
        icon: 'warning', // 最上方為警告的 icon
        showCancelButton: true, // 是否顯示 "取消" 的按鈕
        confirmButtonColor: '#e25151', // 確認按鈕的背景色
        cancelButtonColor: '#B7B7B7', // 取消按鈕的背景色
        cancelButtonText: '不，取消刪除', // 確認按鈕的文字
        confirmButtonText: '是的，我要刪除', // 取消按鈕的文字
        reverseButtons: true, // 按鈕的排列順序
        backdrop: true,
      }).then((result) => {
        if (result.isConfirmed) {
          console.log('Yes, I want to delete this item')
          deleteFaq(faqId)
          // todo: 解決自動更新，不需重新整理
        }
      })
    } catch (err) {
      console.log(err)
      Swal.fire('請稍候再試一次!', 'error')
    }
  }
  return (
    <>
      <Container>
        {/* 標題 */}
        <Title>常見問題管理</Title>

        {/* 新增問答的按鈕 */}
        {/* 點擊 "新增問答" 的按鈕後，執行 handleAddFaqClick */}
        <AddNewFaqButton onClick={handleAddFaqClick}>
          + 新增問答
        </AddNewFaqButton>

        {/* 如果 addPopUp  的 state 為 true，則顯示設定新增問答的彈窗 */}
        {/* 並且將 setAddPopUp 當作 props 帶到彈窗的 component，以便彈窗執行操作時，同時更改 addPopUp 的狀態 */}
        {addPopUp && (
          <ManageFaqAdd setAddPopUp={setAddPopUp} closeModal={closeModal} />
        )}

        {/* 所有問答內容的整個區塊 */}
        <FaqWrapper>
          {/* 撈出 manageFaqData 的每一筆資料 */}
          {manageFaqData.map((item) => {
            return (
              <>
                {/* 每一條常見問題的整個區塊 */}
                <FaqContent>
                  {/* 常見問題左邊：問題與回答 */}
                  <FaqItems key={item.id}>
                    {/* 常見問題左邊：問題 */}
                    <FaqQuestion>{item.question}</FaqQuestion>
                    {/* 常見問題左邊：回答 */}
                    <FaAnswer>{item.answer}</FaAnswer>
                  </FaqItems>

                  {/* 常見問題右邊：更新的按鈕們 */}
                  <FaqUpdateWrapper>
                    {/* 常見問題右邊："編輯" 按鈕 */}
                    {/* 點擊 "編輯" 的按鈕後，執行 handleEditFaqClick */}
                    <FaqEditButton onClick={() => handleEditFaqClick(item.id)}>
                      編輯
                    </FaqEditButton>

                    {/* 如果 editPopUp  的 state 為 true，則顯示設定編輯問答的彈窗 */}
                    {/* 並且將 setEditPopUp 當作 props 帶到彈窗的 component，以便彈窗執行操作時，同時更改 editPopUp 的狀態 */}
                    {editPopUp && (
                      <ManageFaqEdit
                        setEditPopUp={setEditPopUp}
                        closeModal={closeModal}
                        item={item}
                        faqId={item.id}
                      ></ManageFaqEdit>
                    )}

                    {/* 常見問題右邊："刪除" 按鈕 */}
                    {/* 點擊 "刪除" 的按鈕後，執行 handleDeleteQA */}
                    <FaqDeleteButton onClick={() => handleDeleteQA(item.id)}>
                      刪除
                    </FaqDeleteButton>
                  </FaqUpdateWrapper>
                </FaqContent>
              </>
            )
          })}
        </FaqWrapper>
        {/* note：如果彈窗無法串接資料，則使用開新分頁編輯以及直接刪除的方式，並在更新後點擊儲存內容 */}
        {/* <FaqConfirmWrapper>
          <FaqCancelButton>取消</FaqCancelButton>
          <FaqSaveButton>儲存</FaqSaveButton>
        </FaqConfirmWrapper> */}
      </Container>
    </>
  )
}
