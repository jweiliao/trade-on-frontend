import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { BackstageTitle, SubTitle } from '../../components/heading'
import Container from '../../components/Container'
import { SmallButton, DangerSmallButton } from '../../components/buttons'
import { MEDIA_QUERY_SM, MEDIA_QUERY_MD } from '../../styles/breakpoints'
import Swal from 'sweetalert2'
import ManageFaqAdd from '../../components/ManageFaqAdd'
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

/* Title - 標題 */
const Title = styled(BackstageTitle)``

const FaqWrapper = styled.div`
  margin-top: 36px;
  margin-bottom: 50px;
  display: flex;
  flex-direction: column;
`
const FaqContent = styled.div`
  margin-top: 36px;
  margin-bottom: 50px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`

const FaqItems = styled.div`
  padding-bottom: 16px;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid ${(props) => props.theme.general_200};
  & + & {
    margin-top: 40px;
  }
`
const FaqQuestion = styled(SubTitle)`
  cursor: pointer;
`
const FaAnswer = styled.div`
  margin-top: 20px;
  font-size: 16px;
  line-height: 1.5;
  letter-spacing: 0.5px;
`
const FaqUpdateWrapper = styled.div`
  display: flex;
`
const AddNewFaqButton = styled(SmallButton)`
  background-color: ${(props) => props.theme.general_200};
  &:hover {
    background-color: ${(props) => props.theme.general_300};
  }
`

const FaqEditButton = styled(SmallButton)`
  max-width: 60px;
  background-color: ${(props) => props.theme.general_200};
  &:hover {
    background-color: ${(props) => props.theme.general_300};
  }
`

const FaqDeleteButton = styled(DangerSmallButton)`
  max-width: 60px;
  margin-left: 10px;
`
const FaqConfirmWrapper = styled.div`
  display: flex;
  justify-content: center;
`
const FaqCancelButton = styled(SmallButton)`
  background-color: ${(props) => props.theme.general_200};
  &:hover {
    background-color: ${(props) => props.theme.general_300};
  }
`
const FaqSaveButton = styled(SmallButton)`
  margin-left: 27px;
`

export default function ManageFaqPage() {
  const [manageFaqData, setManageFaqData] = useState(faqQuestions)
  const [addPopUp, setAddPopUp] = useState(false)
  const [editPopUp, setEditPopUp] = useState(false)

  const handleAddFaqClick = () => {
    setAddPopUp(!addPopUp)
  }

  const handleEditFaqClick = () => {
    setEditPopUp(!editPopUp)
  }

  const handleDelete = () => {
    Swal.fire({
      title: '刪除',
      text: '確定要刪除嗎？',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#e25151',
      cancelButtonColor: '#B7B7B7',
      cancelButtonText: '不，取消刪除',
      confirmButtonText: '是的，我要刪除',
      reverseButtons: true,
    }).then((result) => {
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
        {/* <Link to="/backstage/faq/add"> */}
        <AddNewFaqButton onClick={handleAddFaqClick}>
          + 新增問答
        </AddNewFaqButton>
        {addPopUp && (
          <ManageFaqAdd
            addPopUp={addPopUp}
            setAddPopUp={setAddPopUp}
            handleAddPopUp={handleAddFaqClick}
          />
        )}
        {/* </Link> */}
        <FaqWrapper>
          {manageFaqData.map((item) => {
            return (
              <>
                <FaqContent>
                  <FaqItems key={item.id}>
                    <FaqQuestion>{item.question}</FaqQuestion>
                    <FaAnswer>{item.answer}</FaAnswer>
                  </FaqItems>
                  <FaqUpdateWrapper>
                    {/* <Link to="/backstage/faq/edit"> */}
                    <FaqEditButton onClick={handleEditFaqClick}>
                      編輯
                    </FaqEditButton>
                    {editPopUp && (
                      <ManageFaqEdit
                        editPopUp={editPopUp}
                        setEditPopUp={setEditPopUp}
                        handleEditPopUp={handleEditFaqClick}
                      />
                    )}
                    {/* </Link> */}
                    <FaqDeleteButton onClick={handleDelete}>
                      刪除
                    </FaqDeleteButton>
                  </FaqUpdateWrapper>
                </FaqContent>
              </>
            )
          })}
        </FaqWrapper>
        <FaqConfirmWrapper>
          <FaqCancelButton>取消</FaqCancelButton>
          <FaqSaveButton>儲存</FaqSaveButton>
        </FaqConfirmWrapper>
      </Container>
    </>
  )
}
