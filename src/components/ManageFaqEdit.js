import { useState } from 'react'
import styled from 'styled-components'
import {
  BackDrop,
  AddFaqWrapper,
  Title,
  AddFaq,
  QuestionInput,
  AnswerInput,
  ConfirmButtonsWrapper,
  CancelButton,
  AddButton,
} from './ManageFaqAdd'
import Swal from 'sweetalert2'
import { updateFaq } from '../WebAPI'

const EditFaqWrapper = styled(AddFaqWrapper)``

const EditFaq = styled(AddFaq)``

const UpdateButton = styled(AddButton)``

export default function ManageFaqEdit({
  editedFaq,
  setFaqs,
  faqs,
  handleToggleEditPopUp,
}) {
  const [updateFaqData, setUpdateFaqData] = useState({
    question: editedFaq.question,
    answer: editedFaq.answer,
  })

  const handleEditInput = (e) => {
    const { name, value } = e.target

    setUpdateFaqData({
      ...updateFaqData,
      [name]: value,
    })
  }

  const handleUpdateFaq = (e) => {
    e.preventDefault()
    updateFaq(editedFaq.id, updateFaqData)
      .then((res) => {
        const newFaq = res.data.update
        if (res.data.message === 'success') {
          Swal.fire({
            icon: 'success',
            title: '更新成功',
            showConfirmButton: false,
            timer: 1500,
          })
          setFaqs(
            faqs.map((faq) => {
              if (faq.id !== newFaq.id) return faq
              return {
                ...faq,
                question: newFaq.question,
                answer: newFaq.answer,
              }
            })
          )
        }
      })
      .catch((err) => {
        console.log(err)
        Swal.fire('發生錯誤！')
      })
    handleToggleEditPopUp()
  }

  return (
    <>
      <BackDrop onClick={handleToggleEditPopUp}></BackDrop>
      <EditFaqWrapper>
        <Title>編輯常見問題</Title>
        <EditFaq>
          問題
          <QuestionInput
            name="question"
            placeholder="請輸入問題"
            value={updateFaqData.question}
            onChange={handleEditInput}
          ></QuestionInput>
          回答
          <AnswerInput
            name="answer"
            placeholder="請輸入回答"
            value={updateFaqData.answer}
            onChange={handleEditInput}
          ></AnswerInput>
        </EditFaq>
        <ConfirmButtonsWrapper>
          <CancelButton onClick={handleToggleEditPopUp}>取消</CancelButton>
          <UpdateButton type="submit" onClick={handleUpdateFaq}>
            更新
          </UpdateButton>
        </ConfirmButtonsWrapper>
      </EditFaqWrapper>
    </>
  )
}
