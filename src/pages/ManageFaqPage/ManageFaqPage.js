import React from 'react'
import styled from 'styled-components'
import { BackstageTitle } from '../../components/heading'
import Container from '../../components/Container'
import {
  BackstageSmallButton,
  DangerSmallButton,
} from '../../components/buttons'
import Pagination from '../../components/Pagination/BackstagePagination'
import { MEDIA_QUERY_SM } from '../../styles/breakpoints'
import ManageFaqAdd from '../../components/ManageFaqAdd'
import ManageFaqEdit from '../../components/ManageFaqEdit'
import useFaqs from '../../hooks/useFaqs'

const Title = styled(BackstageTitle)``

const AddNewFaqButton = styled(BackstageSmallButton)`
  background-color: ${(props) => props.theme.general_200};
  &:hover {
    background-color: ${(props) => props.theme.general_300};
  }
`

const FaqWrapper = styled.div`
  margin-bottom: 3rem;
  display: flex;
  flex-direction: column;
`

const FaqContent = styled.div`
  border-bottom: 1px solid ${(props) => props.theme.general_500};
  padding: 2rem 0;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  ${MEDIA_QUERY_SM} {
    flex-direction: column;
  }
`

const FaqItem = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 1rem;
  ${MEDIA_QUERY_SM} {
    margin-right: 0;
  }
`

const Question = styled.h3`
  font-size: 1.5rem;
  font-weight: 500;
  line-height: 2rem;
  margin-bottom: 1rem;
`

const Answer = styled.p`
  font-size: 1rem;
  line-height: 1.5;
  letter-spacing: 0.5px;
`

const FaqUpdateWrapper = styled.div`
  display: flex;
  ${MEDIA_QUERY_SM} {
    margin-top: 20px;
  }
`

const EditButton = styled(AddNewFaqButton)`
  width: 60px;
`

const DeleteButton = styled(DangerSmallButton)`
  width: 60px;
  margin-left: 1rem;
`

export default function ManageFaqPage() {
  const {
    faqs,
    setFaqs,
    currentFaqs,
    addPopUp,
    handleToggleAddPopUp,
    handleInput,
    handleAddFaq,
    editPopUp,
    editedFaq,
    handleToggleEditPopUp,
    updateFaqData,
    handleEditInput,
    handleUpdateFaq,
    handleDeleteFaq,
    faqsPerPage,
    currentPage,
    handleChangePage,
  } = useFaqs()

  return (
    <Container>
      <Title>常見問題管理</Title>
      <AddNewFaqButton onClick={handleToggleAddPopUp}>新增問答</AddNewFaqButton>
      <FaqWrapper>
        {currentFaqs.map((faq) => {
          return (
            <FaqContent key={faq.id}>
              <FaqItem>
                <Question>{faq.question}</Question>
                <Answer>{faq.answer}</Answer>
              </FaqItem>
              <FaqUpdateWrapper>
                <EditButton
                  onClick={() =>
                    handleToggleEditPopUp(faq.id, faq.question, faq.answer)
                  }
                >
                  編輯
                </EditButton>
                <DeleteButton onClick={() => handleDeleteFaq(faq.id)}>
                  刪除
                </DeleteButton>
              </FaqUpdateWrapper>
            </FaqContent>
          )
        })}
        {addPopUp && (
          <ManageFaqAdd
            setFaqs={setFaqs}
            faqs={faqs}
            handleToggleAddPopUp={handleToggleAddPopUp}
            handleInput={handleInput}
            handleAddFaq={handleAddFaq}
          />
        )}
        {editPopUp && (
          <ManageFaqEdit
            editedFaq={editedFaq}
            setFaqs={setFaqs}
            faqs={faqs}
            handleToggleEditPopUp={handleToggleEditPopUp}
            updateFaqData={updateFaqData}
            handleEditInput={handleEditInput}
            handleUpdateFaq={handleUpdateFaq}
          />
        )}
      </FaqWrapper>
      <Pagination
        dataPerPage={faqsPerPage}
        totalData={faqs.length}
        handleChangePage={handleChangePage}
        currentPage={currentPage}
      />
    </Container>
  )
}
