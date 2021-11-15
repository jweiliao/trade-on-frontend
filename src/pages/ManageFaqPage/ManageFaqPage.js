import React, { useState } from 'react'
import styled from 'styled-components'
import { BackstageTitle, SubTitle } from '../../components/heading'
import Container from '../../components/Container'
import { SmallButton, DangerSmallButton } from '../../components/buttons'

// 引入 sweetalert2 彈窗套件
import Swal from 'sweetalert2'
// 引入 ManageFaqAdd 彈窗 component
import ManageFaqAdd from '../../components/ManageFaqAdd'
// 引入 ManageFaqEdit 彈窗 component
import ManageFaqEdit from '../../components/ManageFaqEdit'

// 先帶入暫時的資料，之後再串接後端的資料
const faqQuestions = [
  {
    question: '請問如何贈物?',
    answer: `點擊 "上傳禮物" 後，輸入要贈物的資料，完成後即可等待索物方請求 `,
    id: 1,
    isShowed: false,
  },
  {
    question: '請問如何索物?',
    answer: `選擇想要索物的物品後，點擊 "想要禮物"，輸入資料後等待贈物者的給予 `,
    id: 2,
    isShowed: false,
  },
]

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
`

/* 常見問題右邊："編輯" 按鈕 */
const FaqEditButton = styled(SmallButton)`
  max-width: 60px;
  background-color: ${(props) => props.theme.general_200};
  &:hover {
    background-color: ${(props) => props.theme.general_300};
  }
`
/* 常見問題右邊："刪除" 按鈕 */
const FaqDeleteButton = styled(DangerSmallButton)`
  max-width: 60px;
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
  const [manageFaqData, setManageFaqData] = useState(faqQuestions)

  // 設定是否顯示新增問答的彈窗的 state，預設 false（不顯示彈窗）
  const [addPopUp, setAddPopUp] = useState(false)

  // 設定是否顯示編輯問答的彈窗的 state，預設 false（不顯示彈窗）
  const [editPopUp, setEditPopUp] = useState(false)

  // 當點擊 "新增問答" 的按鈕時，執行 handleAddFaqClick
  // => 更新 addPopUp 的 state（toggle 彈窗：若原本無顯示彈窗，則打開；若已顯示彈窗，則關閉）
  const handleAddFaqClick = () => {
    setAddPopUp(!addPopUp)
  }

  // 當點擊 "編輯" 的按鈕時，執行 handleEditFaqClick
  // => 更新 editPopUp 的 state（toggle 彈窗：若原本無顯示，則打開彈窗；若已顯示，則關閉彈窗）
  const handleEditFaqClick = () => {
    setEditPopUp(!editPopUp)
  }

  // 當點擊 "刪除" 按鈕時，執行 handleDelete
  const handleDelete = () => {
    // 顯示再次確認刪除的彈窗
    Swal.fire({
      title: '刪除', // 標題
      text: '確定要刪除嗎？', // 內文
      icon: 'warning', // 最上方為警告的 icon
      showCancelButton: true, // 是否顯示 "取消" 的按鈕
      confirmButtonColor: '#e25151', // 確認按鈕的背景色
      cancelButtonColor: '#B7B7B7', // 取消按鈕的背景色
      cancelButtonText: '不，取消刪除', // 確認按鈕的文字
      confirmButtonText: '是的，我要刪除', // 取消按鈕的文字
      reverseButtons: true, // 按鈕的排列順序
    }).then((result) => {
      // 點擊 "確認" 後
      if (result.isConfirmed) {
        Swal.fire({
          title: '刪除成功',
          text: '此筆資料已被刪除',
          icon: 'success',
          confirmButtonColor: '#FFD803',
          confirmButtonText: '完成',
        })
      }
    })
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
        {addPopUp && <ManageFaqAdd setAddPopUp={setAddPopUp} />}

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
                    <FaqEditButton onClick={handleEditFaqClick}>
                      編輯
                    </FaqEditButton>

                    {/* 如果 editPopUp  的 state 為 true，則顯示設定編輯問答的彈窗 */}
                    {/* 並且將 setEditPopUp 當作 props 帶到彈窗的 component，以便彈窗執行操作時，同時更改 editPopUp 的狀態 */}
                    {editPopUp && <ManageFaqEdit setEditPopUp={setEditPopUp} />}

                    {/* 常見問題右邊："刪除" 按鈕 */}
                    {/* 點擊 "刪除" 的按鈕後，執行 handleDelete */}
                    <FaqDeleteButton onClick={handleDelete}>
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
